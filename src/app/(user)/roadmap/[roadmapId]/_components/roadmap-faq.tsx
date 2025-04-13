import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface RoadmapFAQProps {
  title: string
  faq: string
}

export default function RoadmapFAQ({ title, faq }: RoadmapFAQProps) {
  return (
    <Accordion
      sx={{
        mb: 2,
        boxShadow: "none",
        border: "1px solid #e2e8f0",
        "&:before": {
          display: "none",
        },
        borderRadius: "8px !important",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: "#fff",
          "&:hover": {
            bgcolor: "#f8fafc",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight="medium">
            What is a {title.replace(" Developer", "")} Developer?
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "#fff", pt: 0 }}>
        <Typography variant="body1">{faq}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
