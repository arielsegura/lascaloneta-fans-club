import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xA771451e6486734a394cDC31eDCc8C60e8599eF4", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "La Scaloneta Fans Club Membership Card",
        description: "This collectible will give you access to La Scaloneta Fans Club!",
        image: readFileSync("scripts/assets/Members-web.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();