export const GOLDEN_RULES = [
  {
    title: "Everything starts from design",
    paras: [
      "Everything that needs to be developed must be based on a Figma design.",
      "Implementation should not begin based only on Slack conversations, written requirements or verbal discussions.",
    ],
  },
  {
    title: "Product provides complete responsive designs",
    paras: [
      "The Product team is responsible for providing all relevant designs and states before development begins. This includes, where applicable:",
    ],
    list: ["Desktop", "Mobile", "Light mode", "Dark mode", "Relevant interaction and system states"],
    closing: "The objective is to remove ambiguity before implementation starts.",
  },
  {
    title: "Design QA happens before development",
    paras: [
      "Figma designs must be reviewed and approved before implementation begins. Joshua and Nihaal own this review from the QA/technical side.",
      "They currently have some of the strongest knowledge of the platform and also understand the technical implications of product decisions \u2014 their role at this stage is essentially to QA the design before anyone builds it. They should identify:",
    ],
    list: [
      "Missing states",
      "Missing edge cases",
      "Behaviour that is unclear",
      "Inconsistencies with the existing platform",
      "Technical considerations that have not been accounted for",
      "Potential problems with the proposed flow",
    ],
    closing: "The goal is to catch these issues in Figma rather than after development has already started.",
  },
  {
    title: "FSMs are written before development starts",
    paras: [
      "Once a design is approved, the developer creates the FSM before starting development.",
      "Joshua and Nihaal can quickly review the FSM, especially during the first weeks of the transition, but FSMs are now the responsibility of the developers.",
    ],
  },
  {
    title: "The Design System is mandatory",
    paras: [
      "Everything implemented on the platform must use the shared Design System library being implemented by Kavii. We should no longer accept inconsistencies such as:",
    ],
    list: [
      "Different button sizes for the same component",
      "Incorrect color tokens",
      "Colors that break between light and dark mode",
      "Different input fields across different parts of the platform",
      "Recreated components when an existing shared component is available",
    ],
    closing: "The Design System is the implementation standard for the platform, not simply a design reference.",
  },
  {
    title: "Final QA is not a redesign phase",
    paras: [
      "Final QA validates the implementation against the scope and designs that were previously approved. If additional ideas or improvements come to mind during final QA, they should not block the release. Instead they should be added as:",
    ],
    list: [
      "A new improvement/idea in bugs management with lower priority, or",
      "Part of the next release when subsequent releases for that product are already planned",
    ],
    closing: "Critical bugs, broken functionality and deviations from the approved design still need to be fixed before release. The objective is to avoid continuously expanding the scope of a release during final QA.",
  },
  {
    title: "Product QA owns design experience",
    paras: [
      "Prachi and Bianca own Product QA. Their responsibility is to make sure what has been implemented accurately reflects the approved Figma designs.",
      "This includes validating visual consistency, responsive behaviour, design system usage and the overall quality of the implemented experience.",
    ],
  },
  {
    title: "Developers own their code and tests",
    paras: [
      "Automated tests are written entirely by the developers, not by QA. Joshua and Nihaal do not write tests for someone else's implementation.",
      "Developers own 100% of the code they ship, which includes taking responsibility for testing it. QA should not be the first line of defence for implementation issues that appropriate developer testing would have caught.",
    ],
  },
  {
    title: "Product owns prioritization",
    paras: [
      "All new product work enters the Product Priority Queue before being picked up for development. Requests should not directly change a developer's priorities.",
      "Any request anyone receives \u2014 from a client, a colleague or elsewhere \u2014 should be run through Nina and Kavii for assessment before it becomes work.",
      "If a new request needs to take precedence over existing work, Product will assess the impact and explicitly change the order of the Priority Queue.",
    ],
    closing: "This gives the whole company one shared answer to: what are we working on now, and what comes next?",
  },
];

export const STATUS_COLOR = {
  "In Progress": "#EC5512",
  "On going": "#5980A6",
  Delayed: "#C0392B",
  QA: "#FFBE18",
  Blocked: "#F73B3B",
  Ready: "#17B530",
  "Not Started": "#89898A",
  Released: "#0F741F",
};

export const GROUP_COLOR = {
  Shipped: "#17B530",
  "Cleared QA, ready to close": "#2E9BD6",
  "In QA": "#FFBE18",
  "Failed QA, back for rework": "#C0392B",
  "In progress": "#EC5512",
  "In Todo": "#89898A",
  "In Triage": "#F73B3B",
};

export const GROUP_HINT = {
  Shipped: "live on the platform",
  "Cleared QA, ready to close": "verified, waiting to be closed",
  "In QA": "fixed, being verified",
  "Failed QA, back for rework": "found broken in QA, needs another pass",
  "In progress": "being actively worked on",
  "In Todo": "accepted, not started",
  "In Triage": "still being reproduced or scoped",
};
