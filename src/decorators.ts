import BaseProvider from "./providers/BaseProvider";

export const providerClasses: Function[] = [];

export const Provider = () => {
    return (target: Function) => {
        providerClasses.push(target);
    }
}