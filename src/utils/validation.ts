export default {
     isEmptyStr(value: string): boolean  {
        return (value == null || (typeof value === "string" && value.trim().length === 0));
    },
    isNullOrUndefined(value: any): boolean  {
        return (value == null || value == undefined);
    }
}