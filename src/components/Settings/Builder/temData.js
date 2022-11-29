export const builderData = {
  variables: [
    { name: "amount", label: "Amount", field_type: "numeric", options: [] },
    {
      name: "closedate",
      label: "Closedate",
      field_type: "string",
      options: [],
    },
    {
      name: "createddate",
      label: "Createddate",
      field_type: "string",
      options: [],
    },
    {
      name: "dealcoaching",
      label: "Dealcoaching",
      field_type: "numeric",
      options: [],
    },
    {
      name: "dealprogress",
      label: "Dealprogress",
      field_type: "numeric",
      options: [],
    },
    {
      name: "fiscalmonth",
      label: "Fiscalmonth",
      field_type: "numeric",
      options: [],
    },
    {
      name: "fiscalquarter",
      label: "Fiscalquarter",
      field_type: "numeric",
      options: [],
    },
    {
      name: "fiscalyear",
      label: "Fiscalyear",
      field_type: "numeric",
      options: [],
    },
    {
      name: "forecastcategory",
      label: "Forecastcategory",
      field_type: "string",
      options: [],
    },
    {
      name: "forecastcategoryname",
      label: "Forecastcategoryname",
      field_type: "string",
      options: [],
    },
    { name: "isclosed", label: "Isclosed", field_type: "boolean", options: [] },
    {
      name: "isdeleted",
      label: "Isdeleted",
      field_type: "boolean",
      options: [],
    },
    { name: "iswon", label: "Iswon", field_type: "boolean", options: [] },
    {
      name: "lastmodifieddate",
      label: "Lastmodifieddate",
      field_type: "string",
      options: [],
    },
    {
      name: "laststagechangedate",
      label: "Laststagechangedate",
      field_type: "string",
      options: [],
    },
    {
      name: "leadsource",
      label: "Leadsource",
      field_type: "string",
      options: [],
    },
    {
      name: "managerjudgment",
      label: "Managerjudgment",
      field_type: "string",
      options: [],
    },
    {
      name: "number_of_days_in_stage",
      label: "Number Of Days In Stage",
      field_type: "numeric",
      options: [],
    },
    {
      name: "probability",
      label: "Probability",
      field_type: "numeric",
      options: [],
    },
    {
      name: "processflow_Champion_category_is_done",
      label: "Processflow Champion Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Competition_category_is_done",
      label: "Processflow Competition Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Decision_Process_category_is_done",
      label: "Processflow Decision Process Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Decision_criteria_category_is_done",
      label: "Processflow Decision Criteria Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Economic_buyer_category_is_done",
      label: "Processflow Economic Buyer Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Implicate_the_pain_category_is_done",
      label: "Processflow Implicate The Pain Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_Metric_category_is_done",
      label: "Processflow Metric Category Is Done",
      field_type: "boolean",
      options: [],
    },
    {
      name: "processflow_categories_name",
      label: "Processflow Categories Name",
      field_type: "select",
      options: [
        "Metric",
        "Economic buyer",
        "Decision criteria",
        "Decision Process",
        "Implicate the pain",
        "Champion",
        "Competition",
      ],
    },
    {
      name: "pushcount",
      label: "Pushcount",
      field_type: "numeric",
      options: [],
    },
    { name: "risk", label: "Risk", field_type: "numeric", options: [] },
    {
      name: "stagename",
      label: "Stagename",
      field_type: "select",
      options: [
        "Prospecting",
        "Qualification",
        "Needs Analysis",
        "Value Proposition",
        "Id. Decision Makers",
        "Perception Analysis",
        "Proposal/Price Quote",
        "Negotiation/Review",
        "Closed Won",
        "Closed Lost",
      ],
    },
  ],
  actions: [
    {
      name: "add_action",
      label: "Add Action",
      params: [{ label: "Action", name: "action", fieldType: "text" }],
    },
    {
      name: "add_signal",
      label: "Add Signal",
      params: [{ label: "Signal", name: "signal", fieldType: "text" }],
    },
  ],
  variable_type_operators: {
    boolean: [
      { name: "is_false", label: "Is False", input_type: "none" },
      { name: "is_true", label: "Is True", input_type: "none" },
    ],
    numeric: [
      { name: "equal_to", label: "Equal To", input_type: "numeric" },
      { name: "greater_than", label: "Greater Than", input_type: "numeric" },
      {
        name: "greater_than_or_equal_to",
        label: "Greater Than Or Equal To",
        input_type: "numeric",
      },
      { name: "less_than", label: "Less Than", input_type: "numeric" },
      {
        name: "less_than_or_equal_to",
        label: "Less Than Or Equal To",
        input_type: "numeric",
      },
    ],
    select_multiple: [
      {
        name: "contains_all",
        label: "Contains All",
        input_type: "select_multiple",
      },
      {
        name: "is_contained_by",
        label: "Is Contained By",
        input_type: "select_multiple",
      },
      {
        name: "shares_at_least_one_element_with",
        label: "Shares At Least One Element With",
        input_type: "select_multiple",
      },
      {
        name: "shares_exactly_one_element_with",
        label: "Shares Exactly One Element With",
        input_type: "select_multiple",
      },
      {
        name: "shares_no_elements_with",
        label: "Shares No Elements With",
        input_type: "select_multiple",
      },
    ],
    select: [
      { name: "contains", label: "Contains", input_type: "select" },
      {
        name: "does_not_contain",
        label: "Does Not Contain",
        input_type: "select",
      },
    ],
    string: [
      { name: "contains", label: "Contains", input_type: "text" },
      { name: "ends_with", label: "Ends With", input_type: "text" },
      { name: "equal_to", label: "Equal To", input_type: "text" },
      {
        name: "equal_to_case_insensitive",
        label: "Equal To (case insensitive)",
        input_type: "text",
      },
      { name: "matches_regex", label: "Matches Regex", input_type: "text" },
      { name: "non_empty", label: "Non Empty", input_type: "none" },
      { name: "starts_with", label: "Starts With", input_type: "text" },
    ],
  },
};
