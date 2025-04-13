import { Box, Typography } from "@mui/material"

interface ProjectsListProps {
  title: string
  projects: string[]
}

export default function ProjectsList({ title, projects }: ProjectsListProps) {
  return (
    <Box sx={{ p: 4, bgcolor: "#fff", borderRadius: 2, border: "1px solid #e2e8f0" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Project Ideas
      </Typography>
      <Typography variant="body1">
        Here are some project ideas to practice your {title.replace(" Developer", "")} skills:
      </Typography>
      <ul style={{ marginTop: "16px", paddingLeft: "24px" }}>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <Typography variant="body1">{project}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  )
}
