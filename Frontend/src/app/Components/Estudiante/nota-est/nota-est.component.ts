import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PdfMakeWrapper, Txt, ITable,Table } from 'pdfmake-wrapper';

interface TablaData {
  Area: string,
  Asignatura: string,
  Q1P1: number,
  Q1P2: number,
  Q1PROM: number,
  Q1PROM80: number,
  Q1EXAM: number,
  Q1EXAM20: number,
  Q1QUI: number,
  Q1EC: string,

  Q2P1: number,
  Q2P2: number,
  Q2PROM: number,
  Q2PROM80: number,
  Q2EXAM: number,
  Q2EXAM20: number,
  Q2QUI: number,
  Q2EC: string,
  PA: number,
  EC: string,
}
interface TablaGeneral {
  G1P1: number,
  G1P2: number,
  G1PROM: number,
  G1PROM80: number,
  G1EXAM: number,
  G1EXAM20: number,
  G1QUI: number,
  G1EC: string,

  G2P1: number,
  G2P2: number,
  G2PROM: number,
  G2PROM80: number,
  G2EXAM: number,
  G2EXAM20: number,
  G2QUI: number,
  G2EC: string,
  PA: number,
  EC: string,
}

type TableRowG = [ number, number, number, number, number, number, number, string,
  number, number, number, number, number, number, number, string, number, string];

type TableRow = [string, string, number, number, number, number, number, number, number, string,
  number, number, number, number, number, number, number, string, number, string];

@Component({
  selector: 'app-nota-est',
  templateUrl: './nota-est.component.html',
  styleUrls: ['./nota-est.component.css']
})
export class NotaEstComponent implements OnInit {
 

  //titulo
  Titulo = 'CALIFICACIONES DE PERIODO LECTIVO';
  subnivel = 'NOTAS';

  nombre: string | null;
  usuario: string | null;
  periodo: string | null;
  jornada: string | null;
  nivel: string | null;
  paralelo: string | null;
  id: string | null;
  //Matutina
  public Notas: any = {
    dni: []
  }

  public General1: any = {

  }

  public General2: any = {

  }

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private aRouter: ActivatedRoute) {
    this.id = this.aRouter.snapshot.paramMap.get('id'),
      this.nombre = null,
      this.usuario = null,
      this.periodo = null,
      this.jornada = null,
      this.nivel = null,
      this.paralelo = null

  }


  ngOnInit(): void {
    this.loginData();
    this.obtenerHorario();

  }


  Print() {
    let UE = 'UNIDAD EDUCATIVA COMUNITARIA INTERCULTURAL BILINGÜE "BENITO JUÁREZ"';
    let Ttiltulo = ' Educación General Básica '
    let tNombre = 'Nombre: ';
    let tJornada = 'Jornada: ';
    let tNivel = 'Nivel: ';
    let tParalelo = 'Paralelo: ';
    let tPeriodo = 'Año Lectivo: ';
    let T2titulo = 'REPORTE ANUAL DE CALIFICACIONES'

    let notas = this.Notas.dni;
    let general = this.General1;


    // impresion 
    const pdf = new PdfMakeWrapper();

    //formato de Hoja
    //pdf.pageSize('A4');

    //margen
    pdf.pageMargins([40, 50, 40, 50]);
    //estilo por defaul toda la hoja
    pdf.defaultStyle({
      background: 'white'
    })
    // estilos por id
    pdf.styles({
      style1: {
        bold: true,
        fontSize: 15,
        alignment: 'center',
        margin: 5
      },
      style2: {
        bold: true,
        fontSize: 13,
        alignment: 'center',
        margin: 5
      },
      style3: {
        bold: true,
        fontSize: 10,
        alignment: 'center',
        margin: 5
      }
      , style4: {
        bold: true,
        fontSize: 9,
        alignment: 'center',
        margin: 15
      }
      , style5: {
        bold: true,
        fontSize: 12,
        alignment: 'center',
        margin: [5, 5]
       // background: '#F4F4F4'
      //  lineHeight: 2,

      }, style6: {
        fontSize: 7,
        alignment: 'left',
        margin: 0
      },
       style7: {
        bold: true,
        fontSize: 8,
        alignment: 'center',
        margin: 0
      }
    });
    pdf.pageOrientation('landscape');

    pdf.add(
      new Txt(UE).style('style1').end
    );

    pdf.add(
      new Txt(Ttiltulo).style('style2').end
    );

    pdf.add(
      new Txt(tPeriodo + this.periodo).style('style3').end
    );

    pdf.add(
      new Txt(

        tNombre + this.nombre + '                ' +
        tNivel + this.nivel + '                ' +
        tParalelo + this.paralelo + '                ' +
        tJornada + this.jornada

      ).style('style4').end
    );

    pdf.add(
      new Txt(T2titulo).style('style5').end
    );

    pdf.add(this.createEncabezado())
      pdf.add(this.createTables(notas));
      console.log(general)
      pdf.add(this.createGeneral(general));

    pdf.create().open();

  }


  createEncabezado():ITable {
    return new Table([
      [ '', 'PRIMER QUIMESTRE', 'SEGUNDO QUIMESTRE', 'PROMEDIO ANUAL'],
    ]).style('style7').widths([250,203,203,38]).end;
  }

  createGeneral( data: any):ITable {
    return new Table([
      [ 'PROMEDIO GENERAL: ',data.G1P1, data.G1P2, data.G1PROM, data.G1PROM80,data.G1EXAM, data.G1EXAM20, data.G1QUI, data.G1EC,data.G2P1, data.G2P2, data.G2PROM, data.G2PROM80,data.G2EXAM, data.G2EXAM20, data.G2QUI, data.G2EC, data.PA, data.CE ],
    ]).
    style('style6').bold().
    widths([249,15,15,20,20,20,20,15,15,15,15,20,20,20,20,15,15,15,15]).
    end;
  }

  createTables(data: TablaData[]):ITable {
    return new Table([
      [ 'Área', 'Asignatura', 'P1', 'P2',  'PROM','PROM(80%)', 'EXAM','EXAM(20%)', 'QUI','EC',
        'P1','P2', 'PROM','PROM(80%)','EXAM', 'EXAM(20%)','QUI', 'EC', 'PA','EC'],
        ...this.extractData(data)
    ]).style('style6').
    
   layout({
      fillColor:  (rowIndex: number | undefined, node:any | undefined, columnIndex: number | undefined)=>{
        return rowIndex === 0 ? '#F4F4F4' :'';
      }
    }).

    widths([120,120,15,15,20,20,20,20,15,15,15,15,20,20,20,20,15,15,15,15]).end;
  }

  extractData(data: TablaData[]):TableRow []{
    return data.map(row =>[row.Area, row.Asignatura, row.Q1P1, row.Q1P2, row.Q1PROM,
      row.Q1PROM80, row.Q1EXAM, row.Q1EXAM20, row.Q1QUI, row.Q1EC, row.Q2P1,
      row.Q2P2, row.Q2PROM, row.Q2PROM80, row.Q2EXAM, row.Q2EXAM20,
      row.Q2QUI, row.Q2EC, row.PA, row.EC]);
  }



  

  logOut() {
    this.authService.logoutA();
    this.router.navigateByUrl('/app/log-est')
  }

  obtenerHorario() {
    //obtener Periodos activos
    this.authService.obtenerPeriodoEstado().subscribe(data => {
      this.periodo = data.dni[0].Codigo;
     // console.log('periodo', this.periodo);

      const id = localStorage.getItem('id');
      if (id != null) {
        this.authService.obtenerNotaAlumno(this.periodo + "," + id).subscribe(data => {

          this.jornada = data[0].Jornada;
          this.nivel = data[0].Nivel;
          this.paralelo = data[0].Paralelo;


          let calcular: any = data;
          let Q1PROM: any;
          let Q1EXAM: any;
          let Q1PROM80: any;
          let Q1EXAM20: any;
          let Q1QUI: any;

          let Q2PROM: any;
          let Q2EXAM: any;
          let Q2PROM80: any;
          let Q2EXAM20: any;
          let Q2QUI: any;
          let PA: any;

          calcular.forEach((element: any, index: any, array: any) => {
            Q1PROM = this.Promedio(element.Q1P1, element.Q1P2);
            Q1EXAM = element.Q1EXAM;
            Q1PROM80 = this.porciento80(Q1PROM);
            Q1EXAM20 = this.porciento20(Q1EXAM);
            Q1QUI = this.notaQui(Q1PROM80, Q1EXAM20);

            Q2PROM = this.Promedio(element.Q2P1, element.Q2P2);
            Q2EXAM = element.Q2EXAM;
            Q2PROM80 = this.porciento80(Q2PROM);
            Q2EXAM20 = this.porciento20(Q2EXAM);
            Q2QUI = this.notaQui(Q2PROM80, Q2EXAM20);
            PA = this.Promedio(Q1QUI, Q2QUI);





            this.Notas.dni.push({
              Area: element.Area,
              Asignatura: element.Asignatura,

              Q1P1: element.Q1P1,
              Q1P2: element.Q1P2,
              Q1PROM: Q1PROM,
              Q1PROM80: Q1PROM80,
              Q1EXAM: Q1EXAM,
              Q1EXAM20: Q1EXAM20,
              Q1QUI: Q1QUI,
              Q1EC: this.CE(Q1QUI),

              Q2P1: element.Q2P1,
              Q2P2: element.Q2P2,
              Q2PROM: Q2PROM,
              Q2PROM80: Q2PROM80,
              Q2EXAM: element.Q2EXAM,
              Q2EXAM20: Q2EXAM20,
              Q2QUI: Q2QUI,
              Q2EC: this.CE(Q2QUI),
              PA: PA,
              EC: this.CE(PA),

            })

          });
          this.PromedioGeneral1(this.Notas.dni);
          // this.PromedioGeneral2(this.Notas.dni);
        });
      }
    });


  }


  PromedioGeneral1(Notas: any) {
    //Quimestre 1
    let G1P1: number; let G1P2: any; let G1PROM: any; let G1EXAM: any;
    let G1PROM80: any; let G1EXAM20: any; let G1QUI: any; let G1EC: any;
    let PA: any; let CE: any;
    //numero de materias para calcular
    let num: any = Notas.length;

    //CalcularG1
    G1P1 = Notas.map((item: { Q1P1: any; }) => item.Q1P1).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1P2 = Notas.map((item: { Q1P2: any; }) => item.Q1P2).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1PROM = Notas.map((item: { Q1PROM: any; }) => item.Q1PROM).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1PROM80 = Notas.map((item: { Q1PROM80: any; }) => item.Q1PROM80).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1EXAM = Notas.map((item: { Q1EXAM: any; }) => item.Q1EXAM).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1EXAM20 = Notas.map((item: { Q1EXAM20: any; }) => item.Q1EXAM20).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1QUI = Notas.map((item: { Q1QUI: any; }) => item.Q1QUI).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G1EC = this.CE(G1QUI);

    //Quimestre 2
    let G2P1: any; let G2P2: any; let G2PROM: any; let G2EXAM: any;
    let G2PROM80: any; let G2EXAM20: any; let G2QUI: any; let G2EC: any;

    //CalcularG2
    G2P1 = Notas.map((item: { Q2P1: any; }) => item.Q2P1).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2P2 = Notas.map((item: { Q2P2: any; }) => item.Q2P2).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2PROM = Notas.map((item: { Q2PROM: any; }) => item.Q2PROM).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2PROM80 = Notas.map((item: { Q2PROM80: any; }) => item.Q2PROM80).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2EXAM = Notas.map((item: { Q2EXAM: any; }) => item.Q2EXAM).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2EXAM20 = Notas.map((item: { Q2EXAM20: any; }) => item.Q2EXAM20).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2QUI = Notas.map((item: { Q2QUI: any; }) => item.Q2QUI).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    G2EC = this.CE(G2QUI);


    PA = Notas.map((item: { PA: any; }) => item.PA).reduce((prev: any, curr: any) => prev + curr, 0) / Notas.length;
    CE = this.CE(PA);


    this.General1 = {
      G1P1: parseFloat(G1P1.toFixed(2)),
      G1P2: parseFloat(G1P2.toFixed(2)),
      G1PROM: parseFloat(G1PROM.toFixed(2)),
      G1PROM80: parseFloat(G1PROM80.toFixed(2)),
      G1EXAM: parseFloat(G1EXAM.toFixed(2)),
      G1EXAM20: parseFloat(G1EXAM20.toFixed(2)),
      G1QUI: parseFloat(G1QUI.toFixed(2)),
      G1EC: G1EC,

      G2P1: parseFloat(G2P1.toFixed(2)),
      G2P2: parseFloat(G2P2.toFixed(2)),
      G2PROM: parseFloat(G2PROM.toFixed(2)),
      G2PROM80: parseFloat(G2PROM80.toFixed(2)),
      G2EXAM: parseFloat(G2EXAM.toFixed(2)),
      G2EXAM20: parseFloat(G2EXAM20.toFixed(2)),
      G2QUI: parseFloat(G2QUI.toFixed(2)),
      G2EC: G2EC,

      PA: parseFloat(PA.toFixed(2)),
      CE: CE,
    }

  //  console.log('G1: ', this.General1);

  }



  Promedio(p1: number, p2: number): number {
    const promedio: number = (p1 + p2) / 2;
    return parseFloat(promedio.toFixed(2));
  }

  porciento80(prom: number): number {
    const respuesta: number = (prom) * 0.80;
    return parseFloat(respuesta.toFixed(2));
  }

  porciento20(exam: number): number {
    const respuesta: number = (exam) * 0.20;
    return parseFloat(respuesta.toFixed(2));
  }

  notaQui(prom: number, exam: number): number {
    const respuesta: number = prom + exam;
    return parseFloat(respuesta.toFixed(2));
  }

  CE(promQ1: number): string {
    let respuesta: string = "";
    if (promQ1 > 6.99) {
      respuesta = "S/A";
    } else {
      respuesta = "N/A";
    }
    return respuesta;
  }

  loginData() {
    this.usuario = localStorage.getItem('user');
    const id = localStorage.getItem('id');
    if (id != null) {
      this.authService.obtenerEstudianteId(id).subscribe(data => {
        this.nombre = data.Apellidos + " " + data.Nombres;
      }, error => {
        console.log(error);
      });
    }


  }

  view() {
    const id = localStorage.getItem('id');
    this.router.navigateByUrl('/est/perfil/' + id);
  }


}
