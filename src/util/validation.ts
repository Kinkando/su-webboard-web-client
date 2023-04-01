export const validateFormPattern = (value: any, regex: RegExp): any => value?.toString().replace(regex, '')

export const noSpace = (value: string): string => value?.trim().replaceAll(" ", "")
export const notStartWithSpace = (value: string): string => value?.trim() ? value : ""
export const notMultiSpace = (value: string): string => value?.replaceAll("  ", " ")

export const uppercase = (value: string): string => value?.toUpperCase()
export const lowercase = (value: string): string => value?.toLowerCase()

export const maxLength = (value: string, length: number): string => value?.length > length ? value.substring(0, Math.min(length, value?.length)) : value

export const dashIsolate = (value: string): string => [" ", "-"].includes(value) ? "" : value?.replaceAll(" ", "-").replaceAll("--", "-")