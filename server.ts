import { env, connectDB } from "./src/config";
import app from "./src/app";

const PORT = env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
