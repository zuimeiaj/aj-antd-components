interface Ta {
  a: string
  b: string
  c: string
}

interface Ca {
  a: string
}

type Go = Omit<Ta, 'a'>
type Co = Exclude<keyof Ca, keyof Ta>
