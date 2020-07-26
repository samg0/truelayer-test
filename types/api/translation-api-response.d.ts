export interface TranslationResponse {
    contents: Contents
    success:  Success
}

export interface Contents {
    text:        string
    translated:  string
    translation: string
}

export interface Success {
    total: number
}

