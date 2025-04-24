"use client"

import { useTopicContext } from "@/contexts/topic/topic-context"
import { useParams } from "next/navigation"
import { useEffect, useMemo } from "react"

/**
 * Hook for fetching and displaying roadmap details for users
 * Simplified version without editing capabilities
 */
const useRoadmapDetail = () => {
  const params = useParams()
  const { getTopicByIdApi } = useTopicContext()

  // Extract data from API response
  const topic = useMemo(() => getTopicByIdApi.data?.topic || null, [getTopicByIdApi.data])

  const childTopics = useMemo(() => getTopicByIdApi.data?.childs || [], [getTopicByIdApi.data])

  const parentTopic = useMemo(() => getTopicByIdApi.data?.parent || null, [getTopicByIdApi.data])

  // Fetch topic data when roadmapId changes
  useEffect(() => {
    if (params.roadmapId) {
      getTopicByIdApi.call(params.roadmapId as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.roadmapId])

  return {
    topic,
    childTopics,
    parentTopic,
    loading: getTopicByIdApi.loading,
    error: getTopicByIdApi.error,
  }
}

export default useRoadmapDetail
