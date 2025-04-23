"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import UsersApi from "@/api/users"
import useFunction, { DEFAULT_FUNCTION_RETURN, type UseFunctionReturnType } from "@/hooks/use-function"
import type { User, UserTopicProgress } from "@/types/user"
import { UserTopicStatus } from "@/types/user"

interface ContextValue {
  user: User | null
  loading: boolean
  error: Error | null
  isAuthenticated: boolean

  // Topic progress related functions
  getTopicProgressApi: UseFunctionReturnType<string, UserTopicProgress[]>
  createTopicProgressApi: UseFunctionReturnType<
    {
      topicId: string
      status: UserTopicStatus
      notes?: string
      rating?: number
    },
    void
  >
  deleteTopicProgressApi: UseFunctionReturnType<string, { message: string }>

  // Helper functions
  getTopicProgress: (topicId: string) => UserTopicProgress | undefined
  updateTopicProgress: (topicId: string, status: UserTopicStatus, notes?: string, rating?: number) => Promise<void>
  removeTopicProgress: (topicId: string) => Promise<void>

  // Cache management
  clearProgressCache: () => void
  refreshUserData: () => Promise<void>
  refreshTopicProgress: (topicId: string) => Promise<void>
}

const UserContext = createContext<ContextValue>({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  getTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  createTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  deleteTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  getTopicProgress: () => undefined,
  updateTopicProgress: async () => {},
  removeTopicProgress: async () => {},
  clearProgressCache: () => {},
  refreshUserData: async () => {},
  refreshTopicProgress: async () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [progressCache, setProgressCache] = useState<Record<string, UserTopicProgress>>({})
  const [progressFetchAttempts, setProgressFetchAttempts] = useState<Record<string, boolean>>({})

  // API function hooks
  const getTopicProgressApi = useFunction(UsersApi.getTopicProgressByTopicId)
  const createTopicProgressApi = useFunction(UsersApi.createTopicProgress)
  const deleteTopicProgressApi = useFunction(UsersApi.deleteTopicProgress)

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const userData = await UsersApi.me()
        setUser(userData)
        setIsAuthenticated(true)
      } catch (err) {
        console.error("Error fetching user data:", err)
        // Don't set error for unauthorized - this is expected for non-logged in users
        if (err instanceof Error && err.message !== "Lỗi: Unauthorized access") {
          setError(err)
        }
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Helper function to get progress for a specific topic
  const getTopicProgress = useCallback(
    (topicId: string): UserTopicProgress | undefined => {
      // Check cache first
      if (progressCache[topicId]) {
        return progressCache[topicId]
      }

      // If not in cache and we're authenticated and haven't tried to fetch this topic yet,
      // trigger API call and return undefined for now
      if (isAuthenticated && !progressFetchAttempts[topicId]) {
        // Mark that we've attempted to fetch this topic to prevent infinite loops
        setProgressFetchAttempts((prev) => ({
          ...prev,
          [topicId]: true,
        }))

        // The component will re-render when the API call completes
        refreshTopicProgress(topicId)
      }

      return undefined
    },
    [progressCache, isAuthenticated, progressFetchAttempts],
  )

  // Helper function to refresh topic progress from the API
  const refreshTopicProgress = useCallback(
    async (topicId: string): Promise<void> => {
      if (!isAuthenticated) return

      try {
        const progressList = await getTopicProgressApi.call(topicId)

        setProgressCache((prev) => {
            const newCache = { ...prev }
          
            if (Array.isArray(progressList)) {
              progressList.forEach((progress) => {
                if (progress?.topic_id) {
                  newCache[progress.topic_id] = progress
                }
              })
            } else {
              console.warn("⚠️ progressList không phải mảng:", progressList)
            }
          
            return newCache
          })
          
      } catch (error) {
        console.error("Error refreshing topic progress:", error)
      }
    },
    [isAuthenticated, getTopicProgressApi],
  )

  // Helper function to update topic progress
  const updateTopicProgress = useCallback(
    async (topicId: string, status: UserTopicStatus, notes?: string, rating?: number): Promise<void> => {
      try {
        if (isAuthenticated) {
          await createTopicProgressApi.call({ topicId, status, notes, rating })
        }

        // Update cache
        setProgressCache((prev) => ({
          ...prev,
          [topicId]: {
            user_id: user?.id || "",
            topic_id: topicId,
            status,
            notes,
            rating,
            ...(status === UserTopicStatus.IN_PROGRESS ? { started_at: new Date() } : {}),
            ...(status === UserTopicStatus.COMPLETED ? { completed_at: new Date() } : {}),
          },
        }))
      } catch (err) {
        console.error("Error updating topic progress:", err)
        throw err
      }
    },
    [isAuthenticated, createTopicProgressApi, user],
  )

  // Helper function to remove topic progress
  const removeTopicProgress = useCallback(
    async (topicId: string): Promise<void> => {
      try {
        if (isAuthenticated) {
          await deleteTopicProgressApi.call(topicId)
        }

        // Update cache
        setProgressCache((prev) => {
          const newCache = { ...prev }
          delete newCache[topicId]
          return newCache
        })
      } catch (err) {
        console.error("Error removing topic progress:", err)
        throw err
      }
    },
    [isAuthenticated, deleteTopicProgressApi],
  )

  // Clear progress cache
  const clearProgressCache = useCallback(() => {
    setProgressCache({})
    setProgressFetchAttempts({})
  }, [])

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    try {
      setLoading(true)
      const userData = await UsersApi.me()
      setUser(userData)
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Error refreshing user data:", err)
      if (err instanceof Error && err.message !== "Lỗi: Unauthorized access") {
        setError(err)
      }
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        getTopicProgressApi,
        createTopicProgressApi,
        deleteTopicProgressApi,
        getTopicProgress,
        updateTopicProgress,
        removeTopicProgress,
        clearProgressCache,
        refreshUserData,
        refreshTopicProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
