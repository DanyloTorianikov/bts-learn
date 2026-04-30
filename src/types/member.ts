export interface MemberAudio {
  song: string
  songTitle: string
  voice: string
  voiceSource: string
}

export interface MemberFavorites {
  color: string
  food: string
}

export interface SoloProject {
  name: string
  year: number
}

export interface LocalizedString {
  en: string
  ua: string
}

export interface MemberName {
  en: string
  ko: string
}

export interface Member {
  id: string
  name: MemberName
  fullName: MemberName
  role: LocalizedString
  birthDate: string
  height: number
  zodiac: string
  nickname: string
  color: string
  photos: string[]
  audio: MemberAudio
  facts: LocalizedString[]
  soloProjects: SoloProject[]
  hobbies: LocalizedString[]
  favorites: { en: MemberFavorites; ua: MemberFavorites }
}

export type QuizMode = 'photo' | 'name' | 'voice'

export interface QuizQuestion {
  correctMember: Member
  options: Member[]
  correctPhoto: string
  optionPhotos: Record<string, string>
}

export interface QuizResult {
  member: Member
  correct: boolean
}
