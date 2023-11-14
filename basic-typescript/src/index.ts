interface Detail {
  name: string
  age: number
  patner ? : string
}

interface Outfit {
  baju: string
  celana: string
  cd ? : string
}

type Person = Detail & Outfit;

const person: Person = {
  name: 'Bambang',
  age: 12,
  patner: 'Joko',
  baju: 'Adidas',
  celana: 12
}

console.log({ mobil, person })