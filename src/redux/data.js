export const dataFromApi = {
  customer_name: "String",
  forecast_cat: "",
  stage: ["", "", ""],
  size: "100.000",
  days_to_close: "52",
  days_last_update: "2021-12-14",
  days_in_stage: ["12/14", "12/30", "12/31"],
  deal_push: "5", // will be removed
  accurancy: "90", // will be removed

  predictions: {
    ai_win_rate: "60",
    ai_close_date: "2021-12-31",
    win_data_point: {
      WINRATE: [
        {
          data: "Jan",
          coord: 67,
        },
        {
          data: "Feb",
          coord: 50,
        },
      ],
    },
  },

  qualification: {
    categories: [
      // {
      //   cat_name: "Metrics",
      //   cat_questions: ["question 1.1", "question 1.2", "question 1.3"],
      //   question_value: {
      //     sales: [0, 1, 2, 3],
      //     manager: [0, 1, 2, 3],
      //   },
      // },
      {
        cat_name: "Metrics",
        questions: [
          {
            question: "question 1.1",
            answers: 1,
          },
          {
            question: "question 1.2",
            answers: 1,
          },
          {
            question: "question 1.3",
            answers: 1,
          },
        ],
      },
      {
        cat_name: "Metrics",
        questions: [
          {
            question: "question 2.1",
            answers: 2,
          },
          {
            question: "question 2.2",
            answers: 2,
          },
          {
            question: "question 2.3",
            answers: 2,
          },
        ],
      },
    ],
  },

  signals: [
    "Close date pushed 4 times",
    "28 days in current stage",
    "Ai close not in quarter",
  ],

  recommanded_action: [
    {
      act_name: "action 1",
      act_confidence: "confidence 1",
      win_rate: "rate 1",
      explanation: "explanation 2",
      source: "source 1",
      priority: "priority 1",
      date: "date 1",
      status: ["drop", "relation", "complete", "retain"],
    },
    {
      act_name: "action 2",
      act_confidence: "confidence 2",
      win_rate: "rate 2",
      explanation: "explanation 2",
      source: "source 2",
      priority: "priority 2",
      date: "date 2",
      status: ["drop", "relation", "complete", "retain"],
    },
    {
      act_name: "action 3",
      act_confidence: "confidence 3",
      win_rate: "rate 3",
      explanation: "explanation 3",
      source: "source 3",
      priority: "priority 3",
      date: "date 3",
      status: ["drop", "relation", "complete", "retain"],
    },
    {
      act_name: "action 4",
      act_confidence: "confidence 4",
      win_rate: "rate 4",
      explanation: "explanation 4",
      source: "source 4",
      priority: "priority 4",
      date: "date 4",
      status: ["drop", "relation", "complete", "retain"],
    },
  ],
};

//

const data = {
  id: "g-0.7159712073104136",
  rules: [
    {
      id: "r-0.07653796073710772",
      field: "amount",
      operator: "equal_to",
      valueSource: "value",
      value: "",
    },
    {
      id: "r-0.904918263145079",
      field: "closedate",
      operator: "contains",
      valueSource: "value",
      value: "",
    },
    {
      id: "g-0.5983139925670686",
      rules: [
        {
          id: "r-0.9488267758221638",
          field: "amount",
          operator: "equal_to",
          valueSource: "value",
          value: "",
        },
        {
          id: "r-0.17390281277935893",
          field: "amount",
          operator: "equal_to",
          valueSource: "value",
          value: "",
        },
      ],
      combinator: "any",
      not: false,
    },
  ],
  combinator: "all",
  not: false,
};

const recur = (arr) => {
  arr.forEach((item) => {
    if (item.rules) {
      console.log("BEGIN combinator************: " + item.combinator);
      recur(item.rules);
      console.log("END combinator************: " + item.combinator);
    } else {
      // console.log("{");
      // console.log("field: " + item.field);
      // console.log("value: " + item.value);
      // console.log("operator: " + item.operator);
      // console.log("valueSource: " + item.valueSource);
      // console.log("}");
      console.log(item);
    }
  });
};
recur(data.rules);

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
let data = {
  rules: [
    {
      field: "amount",
      value: "azerty",
      operator: "equal_to",
      valueSource: "value",
    },
    {
      field: "createddate",
      value: "ok",
      operator: "contains",
      valueSource: "value",
    },
    {
      rules: [
        {
          field: "amount000",
          value: "azert",
          operator: "equal_to",
          valueSource: "value",
        },
      ],
      combinator: "any",
      not: false,
    },
    {
      field: "fiscalquarter",
      value: "4",
      operator: "equal_to",
      valueSource: "value",
    },
  ],
  combinator: "all",
  not: false,
};

const formatting = (arr) => {
  arr.forEach((item) => {
    if (item["rules"] !== undefined) {
      renameKey(item, "rules", item.combinator);
    }
  });
};

formatting(data.rules);
renameKey(data, "rules", data.combinator);

function renameKey(obj, oldKey, newKey) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}
console.log(data);
