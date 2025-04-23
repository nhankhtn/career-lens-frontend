"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import UsersApi from "@/api/users"
import useFunction, { DEFAULT_FUNCTION_RETURN, type UseFunctionReturnType } from "@/hooks/use-function"
import { User, UserTopicProgress, UserTopicStatus } from "@/types/user"

interface ContextValue {
  user: User | null
  loading: boolean
  error: Error | null

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
}

const UserContext = createContext<ContextValue>({
  user: null,
  loading: false,
  error: null,
  getTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  createTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  deleteTopicProgressApi: DEFAULT_FUNCTION_RETURN,
  getTopicProgress: () => undefined,
  updateTopicProgress: async () => {},
  removeTopicProgress: async () => {},
  clearProgressCache: () => {},
  refreshUserData: async () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [progressCache, setProgressCache] = useState<Record<string, UserTopicProgress>>({})

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
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch user data"))
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Helper function to get progress for a specific topic
  const getTopicProgress = (topicId: string): UserTopicProgress | undefined => {
    // Check cache first
    if (progressCache[topicId]) {
      return progressCache[topicId]
    }

    // If not in cache, trigger API call and return undefined for now
    // The component will re-render when the API call completes
    getTopicProgressApi.call(topicId).then((progressList) => {
        if (Array.isArray(progressList)) {
          const newCache = { ...progressCache }
          progressList.forEach((progress) => {
            newCache[progress.topic_id] = progress
          })
          setProgressCache(newCache)
        } else {
          console.error("Expected an array for progressList, got:", progressList)
        }
      })
      

    return undefined
  }

  // Helper function to update topic progress
  const updateTopicProgress = async (
    topicId: string,
    status: UserTopicStatus,
    notes?: string,
    rating?: number,
  ): Promise<void> => {
    try {
      await createTopicProgressApi.call({ topicId, status, notes, rating })

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
  }

  // Helper function to remove topic progress
  const removeTopicProgress = async (topicId: string): Promise<void> => {
    try {
      await deleteTopicProgressApi.call(topicId)

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
  }

  // Clear progress cache
  const clearProgressCache = () => {
    setProgressCache({})
  }

  // Refresh user data
  const refreshUserData = async () => {
    try {
      setLoading(true)
      const userData = await UsersApi.me()
      setUser(userData)
    } catch (err) {
      console.error("Error refreshing user data:", err)
      setError(err instanceof Error ? err : new Error("Failed to refresh user data"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        getTopicProgressApi,
        createTopicProgressApi,
        deleteTopicProgressApi,
        getTopicProgress,
        updateTopicProgress,
        removeTopicProgress,
        clearProgressCache,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
