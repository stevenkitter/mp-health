const BaseUrl = "https://health.julu666.com";
// const BaseUrl = "http://localhost:8080";

const Code2SessionUri = BaseUrl + "/code2session";

const UploadFileUri = BaseUrl + "/uploadOneFile";

const MyDetections = BaseUrl + "/detection/my";

const RecommendPlanUrl = BaseUrl + "/detectionPlan";

const ChoosePlanUrl = BaseUrl + "/plan/set";

const PlanListUrl = BaseUrl + "/myPlan";

const MyCardUrl = BaseUrl + "/card/my";

const AddCardUrl = BaseUrl + "/card/add";


const AddDetectionUrl = BaseUrl + "/detection";
const DeleteDetectionUrl = BaseUrl + "/detection";
module.exports = {
  BaseUrl: BaseUrl,
  Code2SessionUri: Code2SessionUri,
  UploadFileUri: UploadFileUri,

  MyDetections: MyDetections,
  RecommendPlanUrl: RecommendPlanUrl,
  ChoosePlanUrl: ChoosePlanUrl, 
  PlanListUrl: PlanListUrl,
  MyCardUrl: MyCardUrl,
  AddCardUrl: AddCardUrl,
  AddDetectionUrl: AddDetectionUrl,
  DeleteDetectionUrl: DeleteDetectionUrl
}