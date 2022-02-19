import { prefixNames } from "framework-utils";
import { PREFIX } from "../interface/const";

export function prefix(...classNames: string[]) {
  return prefixNames(`${PREFIX}-`, ...classNames);
}