import humanize from 'humanize-duration'

const humanizeTime = (ms: number) => {
    return humanize(
        ms,
        {
            largest: 2
        }
    )
}

/**
 * Get time span from given time to current time in ms
 * @param { number | string } time Time as a datetime string or a number in ms 
 * @param { boolean } humanize Whether to humanize the output as a human readable string
 * @returns { number | string } Number in ms if humanize is `false`, string if humanize is `true`
 */
export default function getAge(time: number | string, humanize = false): number | string {
    //console.log( time )
    //console.log( new Date() )
    //console.log( new Date(time) )
    const age = new Date().getTime() - new Date(time).getTime()
    return humanize ? humanizeTime(age) : age
}