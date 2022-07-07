import StringUtils from "./StringUtils";

class DateParser {

    /**
     * Parses a date string of format DD.MM.YYYY or DD.MM. (assuming the current year)
     * @param input date string to parse
     */
    static parse(input: string): Date {
        input = [...input].join("");

        const now = new Date();

        if(StringUtils.lastCharacter(input) === ".") {
            input += now.getFullYear();
        }

        const splits = input.split(".");
        const day = parseInt(splits[0]);
        const month = parseInt(splits[1]) - 1;
        const year = parseInt(splits[2]);

        if(day === NaN || month == NaN || year == NaN) {
            throw new Error("Invalid format.");
        }

        return new Date(year, month, day, 0, 0, 0, 0);
    }

}


export default DateParser;