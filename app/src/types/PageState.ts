export type PageState = {
    /**
     * Error message to display, or null to not display any error
     */
    error: string | null,
    /**
     * Whether the page should display a 'loading' state
     */
    loading: boolean
}