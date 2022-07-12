interface Countries {
  nome: string
  codigo?: string
  fone?: string
  iso?: string
  iso3?: string
  nomeFormal?: string
}

export const formatCountries = (countries: Countries[]) => {
  const newFormat = countries.map((country) => ({
    value: country.nome,
    label: country.nome,
  }))

  return newFormat
}
