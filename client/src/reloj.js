




export const mueveReloj=()=>{
    let  momentoActual = new Date()
    let h = momentoActual.getHours()
    let minuto = momentoActual.getMinutes()
    let segundo = momentoActual.getSeconds()

    let horaImprimible = h + " : " + minuto + " : " + segundo

    //document.form_reloj.reloj.value = horaImprimible

    setTimeout("mueveReloj()",1000)
    return horaImprimible;
}