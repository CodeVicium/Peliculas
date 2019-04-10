package objlab3;

public class persona {
    private String nombre;
    private String apellido;
    private int documento;
    private int nacimiento;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public int getDocumento() {
        return documento;
    }

    public void setDocumento(int documento) {
        this.documento = documento;
    }

    public int getNacimiento() {
        return nacimiento;
    }

    public void setNacimiento(int nacimiento) {
        this.nacimiento = nacimiento;
    }

    public persona(String nombre, String apellido, int documento, int nacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.nacimiento = nacimiento;
    }
    public String nombreCompleto(){
        return "mi nombre es completo es: "+apellido+", "+nombre;
    }
    public  int edad(){
        return 2019 - nacimiento;
    }
    
    public float imc(float peso,float altura){
        float imcR = peso /(altura*altura);
        return imcR;
    }
    
}
