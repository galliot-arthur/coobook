export const includeIngredient = (ingredients, term) => {
    let string = ""
    ingredients.map(i => string += i.name + " ")

    if (string
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(term)) {
        return true
    }
    return false
}

