export function governanceMeta(knowledgePackId: string, graphId: string) {
  return {
    knowledgePackId,
    graphId,
    policyVersion: "aims-v1",
    riskRegisterVersion: "risk-v1",
  };
}
