export function getDateToCard(){
    const date = new Date()
    const year = date.getFullYear() + 5
    const month = date.getMonth()
    return new Date(`${year}-${month}`)
}

export function formatTimestampToBirthdate(birthdate: Date){
    const hoje = new Date()
    return Math.floor(Math.ceil(Math.abs(birthdate.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
    
}

export function nameFormatter(fullName : string){
    const splitedName = fullName.split(" ")
    let formatedName = ""
    
    for(let i = 0; i < splitedName.length; i++){
            if(i === 0 ){
                    formatedName += `${splitedName[i]} `
            }else
            if(i === splitedName.length -1){
                    formatedName += splitedName[i] 
            } else{
                    formatedName += `${splitedName[i][0]} `
            }

    }
    return formatedName.toUpperCase()
}