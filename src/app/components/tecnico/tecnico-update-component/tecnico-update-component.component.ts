import { Component, OnInit } from '@angular/core';
import { Tecnico } from './../../../models/tecnico';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update-component',
  templateUrl: './tecnico-update-component.component.html',
  styleUrls: ['./tecnico-update-component.component.css']
})
export class TecnicoUpdateComponentComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }
  admin: boolean = false;
  cliente: boolean = false;
  tec: boolean = false;

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =   new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(private service: TecnicoService,
              private toast: ToastrService, 
              private router: Router,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRout.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      const roleMapping: { [key: string]: number } = {
        "ADMIN": 0,
        "TECNICO": 1,
        "CLIENTE": 2,
      };

      if(resposta.perfis.includes("ADMIN")){
      this.admin = true;
      }
      if(resposta.perfis.includes("TECNICO")){
        this.cliente = true;
      }
      if(resposta.perfis.includes("CLIENTE")){
        this.tec = true;
      }
      // Converta os perfis para os índices
      resposta.perfis = resposta.perfis.map(perfil => roleMapping[perfil]);

      this.tecnico = resposta
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso','Update');
      this.router.navigate(['tecnicos']);
    },ex => {
      if(ex.error.errors){
        console.log("entrou aqui")
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfis(event: any, perfil: any): void {
    if (event.checked) {
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis)
     
    } else {
      const index = this.tecnico.perfis.indexOf(perfil);
      if (index > -1) {
        this.tecnico.perfis.splice(index, 1);
      }
    }
  }
  
  validaCampos(): boolean { 
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }
}
