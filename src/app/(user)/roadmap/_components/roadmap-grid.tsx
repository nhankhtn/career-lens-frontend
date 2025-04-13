import { Grid, Card, CardContent, Box, Typography } from "@mui/material"
import RoadmapCard from "./roadmap-card"
import AddIcon from "@mui/icons-material/Add"

interface Roadmap {
  title: string
  href: string
  isNew?: boolean
}

interface RoadmapGridProps {
  roadmaps: Roadmap[]
  type: "role" | "own"
}

export default function RoadmapGrid({ roadmaps, type }: RoadmapGridProps) {
  return (
    <Grid container spacing={2}>
      {roadmaps.map((roadmap) => (
        <Grid item xs={12} sm={6} md={4} key={roadmap.title}>
          <RoadmapCard title={roadmap.title} href={roadmap.href} isNew={roadmap.isNew} />
        </Grid>
      ))}

    </Grid>
  )
}
