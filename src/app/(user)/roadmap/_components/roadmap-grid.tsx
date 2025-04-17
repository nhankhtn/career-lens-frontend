import { Grid } from "@mui/material"
import RoadmapCard from "./roadmap-card"
import type { Topic } from "../_data/roadmap-details"

interface RoadmapGridProps {
  roadmaps: Topic[]
}

export default function RoadmapGrid({ roadmaps }: RoadmapGridProps) {
  return (
    <Grid container spacing={2}>
      {roadmaps.map((roadmap) => (
        <Grid item xs={12} sm={6} md={4} key={roadmap.id}>
          <RoadmapCard id={roadmap.id} title={roadmap.title} description={roadmap.description} />
        </Grid>
      ))}
    </Grid>
  )
}
