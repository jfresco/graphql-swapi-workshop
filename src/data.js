import fetch from 'isomorphic-fetch'

export const films = () => fetch('http://swapi.co/api/films/').then(res => res.json())
export const people = () => fetch('http://swapi.co/api/people/').then(res => res.json())
