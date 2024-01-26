import humanize from 'humanize-duration';

/**
 * Convert milliseconds to human readable time format
 * @param ms time in milliseconds
 */
const humanizeTime = (ms: number) => {
    // Use 'humanize-duration' library to humanize time and return the formatted time
    return humanize(
        ms,
        {
            round: true,
            units: ["y", "mo", "w", "d", "h", "m"],
            largest: 2
        }
    )
}

/**
 * Get time span from given time to current time in ms
 * 
 * @param { number | string } time Time as a datetime string or a number in ms 
 * @param { boolean } humanize Whether to humanize the output as a human readable string
 * 
 * @returns { number | string } Number in ms if humanize is `false`, formatted time string if humanize is `true`
 */
export default function getAge (time: number | string, humanize = false): number | string {
    // Calculate age
    const age = new Date().getTime() - new Date(time).getTime()
    // Return calculated age, optionally humanizing the time to make it readable
    return humanize ? humanizeTime(age) : age
}