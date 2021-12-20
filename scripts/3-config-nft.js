import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xe2fd2B91BE3A91f9DEAfdd7303DF14833E498025",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Sproutling",
        description: "This NFT will give you access to gardenDAO",
        image: readFileSync("scripts/assets/loop_seed.gif"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()