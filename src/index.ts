import { onUI } from "./onUI";
export * from "./onUI";

const onui = function (): onUI {
    return new onUI()
}

export default onui