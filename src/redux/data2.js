export const dataFromApi = {
  opportunities: {
    info: {
      total_number: "27",
      total_size: "100",
    },
    data: [
      {
        name: "H&M1",
        sales_person: "",
        size: 900,
        upside: "$ 30.000",
        winscore: "%78",
        stage: "stage 1",
        category: "",
        close_date: "30 Jan 2022",
        ai_close_date: "30 Jan 2022",
        next_best_action: "Confirm budget",
        insights: {
          actions: ["", "", ""],
          signals: ["", "", ""],
          quatile: "Q1",
        },
        opp_forecast: ["very risk", "risky", "healthy", "solid"],
        opp_progress: ["steady", "Slow"],
        // qualification: ["Metrics, ... and other categories"],
      },
      {
        name: "H&M2",
        sales_person: "",
        size: 500,
        upside: "$ 30.000",
        winscore: "%78",
        stage: "stage 3",
        category: "",
        close_date: "30 Jan 2022",
        ai_close_date: "30 Jan 2022",
        next_best_action: "Confirm budget",
        insights: {
          actions: ["", "", ""],
          signals: ["", "", ""],
          quatile: "Q3",
        },
        opp_forecast: ["very risky", "healthy", "solid"],
        opp_progress: ["Fast", "steady", "Slow"],
        qualification: ["Metrics, ... and other categories"],
      },
      {
        name: "H&M3",
        sales_person: "",
        size: 100,
        upside: "$ 30.000",
        winscore: "%78",
        stage: "stage 5",
        category: "",
        close_date: "30 Jan 2022",
        ai_close_date: "30 Jan 2022",
        next_best_action: "Confirm budget",
        insights: {
          actions: ["", "", ""],
          signals: ["", "", ""],
          quatile: "Q5",
        },
        opp_forecast: ["very risky", "healthy", "solid"],
        opp_progress: ["Fast", "steady", "Slow"],
        qualification: ["Metrics, ... and other categories"],
      },
    ],
  },
  forecast_healthcheck: {
    target: "9.000.000",
    ai_forecast: "7.500.000",
    ai_bestcase: "9.500.00",
    ai_win_rate: "60",
    commit: "8.500.000",
    closed: "6.000.000",
    gap: "2.500.000",
    ai_win_rate_graph: {
      hard_commit: [
        {
          data: "Jan",
          coord: 10,
        },

        {
          data: "Fev",
          coord: 67,
        },

        {
          data: "Mar",
          coord: 50,
        },
        {
          data: "Apr",
          coord: 80,
        },
        {
          data: "May",
          coord: 30,
        },
        {
          data: "Jun",
          coord: 90,
        },
        {
          data: "Jul",
          coord: 20,
        },
      ],
      rep_commit: [
        {
          data: "Jan",
          coord: 50,
        },

        {
          data: "Fev",
          coord: 10,
        },

        {
          data: "Mar",
          coord: 60,
        },
        {
          data: "Apr",
          coord: 80,
        },
        {
          data: "May",
          coord: 90,
        },
        {
          data: "Jun",
          coord: 10,
        },
        {
          data: "Jul",
          coord: 20,
        },
      ],
      ai_forecast: [
        {
          data: "Jan",
          coord: 90,
        },

        {
          data: "Fev",
          coord: 50,
        },

        {
          data: "Mar",
          coord: 50,
        },
        {
          data: "Apr",
          coord: 40,
        },
        {
          data: "May",
          coord: 90,
        },
        {
          data: "Jun",
          coord: 10,
        },
        {
          data: "Jul",
          coord: 70,
        },
      ],
    },
    average_deal_size_graph: {
      bestCase: [
        {
          data: "Jan",
          coord: 10,
        },

        {
          data: "Fev",
          coord: 67,
        },

        {
          data: "Mar",
          coord: 50,
        },
        {
          data: "Apr",
          coord: 80,
        },
        {
          data: "May",
          coord: 30,
        },
        {
          data: "Jun",
          coord: 90,
        },
        {
          data: "Jul",
          coord: 20,
        },
      ],
      ai_best_case: [
        {
          data: "Jan",
          coord: 90,
        },

        {
          data: "Fev",
          coord: 50,
        },

        {
          data: "Mar",
          coord: 50,
        },
        {
          data: "Apr",
          coord: 40,
        },
        {
          data: "May",
          coord: 90,
        },
        {
          data: "Jun",
          coord: 10,
        },
        {
          data: "Jul",
          coord: 70,
        },
      ],
    },
    productivity_graph: ["data_point"],
  },
  stages: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5"],
  sales_track: ["Below track", "On track", "Above track"],
};
