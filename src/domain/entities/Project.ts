export type Project = {
    title: string
    tags: string[]
    description: string
    githubUrl?: string
    demoUrl?: string
    /** Kod/demo linki yoksa nedenini kısaca açıklayan not — "Okul projesi",
     * "Şirket projesi (kapalı kaynak)" gibi. githubUrl/demoUrl varsa hiç
     * kullanılmaz. */
    note?: string
}
