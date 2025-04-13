import { Grid, Stack, Paper } from "@mui/material";
import ProfileSidebar from "@/app/(user)/forum/_sections/profile-sidebar";
import PostCreator from "@/app/(user)/forum/_sections/post-creater";
import PostList from "@/app/(user)/forum/_sections/post-list";
import SuggestedUsers from "@/app/(user)/forum/_sections/suggested-users";

const CareerContent = () => {
    return <Stack>
        <Grid container spacing={2}>
            {/* Left sidebar - Profile */}
            <Grid item xs={12} md={3}>
                <ProfileSidebar />
            </Grid>

            {/* Main content - Posts */}
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <PostCreator />
                </Paper>
                <PostList />
            </Grid>

            {/* Right sidebar - Suggested users */}
            <Grid item xs={12} md={3}>
                <SuggestedUsers />
            </Grid>
        </Grid>
    </Stack>;
};

export default CareerContent;
