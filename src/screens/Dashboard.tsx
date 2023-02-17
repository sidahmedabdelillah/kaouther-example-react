import { Grid, Paper } from "@mui/material";
import DjeezyAppChartDailyGet from "../components/charts/djeezy-app/DjeezyAppChartDailyGet";

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={12} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DjeezyAppChartDailyGet />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard