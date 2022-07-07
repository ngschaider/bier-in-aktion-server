class StringUtils {

    static count(input: string, character: string): number {
        if(character.length !== 1) {
            throw new Error("character must be of length 1.");
        }

        return input.split("").filter(c => c !== character).length;
    }

    static lastCharacter(input: string) {
        return input[input.length - 1];
    }

}

export default StringUtils;