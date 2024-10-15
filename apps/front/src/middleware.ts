import { withMiddlewares } from "./middlewares/middlewares";
import { withAuth } from "./middlewares/withAuth";

const middlewares = [withAuth];

export default withMiddlewares(middlewares);
