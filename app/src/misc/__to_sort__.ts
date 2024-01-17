/*
    This file holds leftover code from refactorings that should be sorted/removed.
    Please do not export from this file directly, instead extract the needed function
    into a separate file
*/

// const humanizeTime = (ms: number) => {
//     // return humanize(
//     //     ms,
//     //     {
//     //         round: true,
//     //         units: ["y", "mo", "w", "d", "h", "m"],
//     //         largest: 2
//     //     }
//     // )
// }

/**
 * Get time span from given time to current time in ms
 * @param { number | string } time Time as a datetime string or a number in ms 
 * @param { boolean } humanize Whether to humanize the output as a human readable string
 * @returns { number | string } Number in ms if humanize is `false`, string if humanize is `true`
 */
// const getAge = (time: number | string, humanize = false): number | string => {
//     //console.log( time )
//     //console.log( new Date() )
//     //console.log( new Date(time) )
//     const age = new Date().getTime() - new Date(time).getTime()
//     //return humanize ? humanizeTime(age) : age
// }