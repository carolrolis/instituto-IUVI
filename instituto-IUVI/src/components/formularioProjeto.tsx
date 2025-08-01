import React, { useState, useEffect, useRef } from "react";
import { SelectorIcon } from "../assets/images/icons/selector";
import { CheckIcon } from "../assets/images/icons/selector";
import { Hint } from "@progress/kendo-react-labels";
import {
  TextArea,
  type TextAreaChangeEvent,
} from "@progress/kendo-react-inputs";
import closeIcon from "../assets/images/icons/cross.svg";

const categoriasDeProjeto = [
  { id: 1, name: "Ensino" },
  { id: 2, name: "Pesquisa" },
  { id: 3, name: "Extensão" },
];

interface FormularioProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

const FormularioProjeto: React.FC<FormularioProjetoProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [titulo, setTitulo] = useState("");
  const [coordenador, setCoordenador] = useState("");
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [selected, setSelected] = useState(categoriasDeProjeto[0]);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const max = 122;

  const handleDescricaoChange = (e: TextAreaChangeEvent) => {
    setDescricao(e.value);
  };
  
  const resetForm = () => {
    setTitulo("");
    setCoordenador("");
    setLink("");
    setDescricao("");
    setEmail("");
    setImagem(null);
    setSelected(categoriasDeProjeto[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!imagem) {
      alert("Por favor, selecione uma imagem para o projeto.");
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('categoria', selected.name);
    formData.append('coordenador', coordenador);
    formData.append('link', link);
    formData.append('descricao', descricao);
    formData.append('email', email);
    formData.append('imagem', imagem);

    // Chama a função do pai e depois limpa o formulário
    onSubmit(formData);
    resetForm();
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="formulario-projeto"
      className="fixed inset-0 bg-pretoTransparente flex items-center justify-center z-2000"
      onClick={onClose}
    >
      <div
        className="bg-roxoEscuro rounded-2xl shadow-xl max-w-9/10 lg:max-w-80/100 m-auto px-5 md:px-15 py-5 md:py-15 max-h-[90vh] overflow-y-auto text-white no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="relative" onSubmit={handleSubmit}>
          <h1 id="formulario-projeto-titulo" className="text-2xl md:text-5xl xl:text-7xl font-grifter mb-2">
            Cadastro de Projetos
          </h1>
          <p id="formulario-projeto-descricao" className="text-xs sm:text-lg lg:text-2xl mt-5 mb-15">
            <ul className="pl-5 max-w-9/10 list-disc list-inside">
              <li>Ser de Ensino, Pesquisa ou Extensão.</li>
              <li>Ter relação com o Instituto UFC Virtual.</li>
              <li>Todos os campos do formulário devem estar preenchidos corretamente, evitando erros de ortografia e/ou imagens inadequadas.</li>
              <li>Preenchimento obrigatório em todos os campos</li>
            </ul>
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-10 lg:gap-15 mb-10">
            <div className="flex-grow md:flex-2/3 flex flex-col">
              <label htmlFor="input-titulo-projeto" className="text-2xl md:text-4xl font-semibold pb-2">Título</label>
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required id="input-titulo-projeto" type="text" title="Título do projeto" placeholder="Ex: Igrejota" className="text-md md:text-xl px-5 py-2 md:px-8 md:py-5 bg-white text-preto rounded-xl md:rounded-3xl focus:outline-none placeholder:text-cinzaEscuro"/>
            </div>
            <div className="flex-grow md:flex-1/3 flex flex-col">
              <label className="text-2xl md:text-4xl font-semibold pb-2">Categoria</label>
              <div className="relative mt-1" id="input-categoria-projeto" ref={selectRef}>
                <button type="button" onClick={() => setIsSelectOpen(!isSelectOpen)} className="relative w-full cursor-pointer bg-white text-preto rounded-xl md:rounded-3xl text-left px-5 py-2 md:px-8 md:py-5 text-md md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-roxoClaro">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5"><SelectorIcon /></span>
                </button>
                {isSelectOpen && (
                  <ul className="absolute z-10 mt-2 w-full overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categoriasDeProjeto.map((categoria) => (
                      <li key={categoria.id} onClick={() => { setSelected(categoria); setIsSelectOpen(false); }} className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-preto hover:bg-roxoClaro/30 hover:text-roxoEscuro">
                        <span className={`block truncate text-lg ${selected.id === categoria.id ? "font-bold" : "font-normal"}`}>{categoria.name}</span>
                        {selected.id === categoria.id && (<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-roxoEscuro"><CheckIcon /></span>)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex-grow md:flex-2/3 flex flex-col mb-10">
            <label htmlFor="input-coordenador-projeto" className="flex-2/3 text-2xl md:text-4xl font-semibold pb-2">Coordenador</label>
            <input value={coordenador} onChange={(e) => setCoordenador(e.target.value)} required id="input-coordenador-projeto" type="text" title="Coordenador do projeto" placeholder="Ex: Professor Glaudiney Moreira Mendonça" className="text-md md:text-xl px-5 py-2 md:px-8 md:py-5 bg-white text-preto rounded-xl md:rounded-3xl focus:outline-none placeholder:text-cinzaEscuro"/>
          </div>

          <div className="flex-grow md:flex-2/3 flex flex-col mb-10">
            <label htmlFor="input-link-projeto" className="flex-2/3 text-2xl md:text-4xl font-semibold pb-2">Link</label>
            <input value={link} onChange={(e) => setLink(e.target.value)} required id="input-link-projeto" type="text" title="Link do projeto" placeholder="Ex: https://www.instagram.com/igrejotaufc/" className="text-md md:text-xl px-5 py-2 md:px-8 md:py-5 bg-white text-preto rounded-xl md:rounded-3xl focus:outline-none placeholder:text-cinzaEscuro"/>
          </div>

          <div className="flex-grow md:flex-2/3 flex flex-col mb-50 md:mb-60">
            <label htmlFor="input-descricao-projeto" className="text-2xl md:text-4xl font-semibold pb-2">Descrição</label>
            <div className="textarea-container absolute w-full mt-12 text-md md:text-xl px-5 py-2 md:px-8 md:py-5 bg-white text-preto rounded-xl md:rounded-3x">
              <TextArea maxLength={max} value={descricao} onChange={handleDescricaoChange} rows={4} placeholder="Ex: Incrível Grupo de Estudos de Jogos de Tabuleiro..." className="placeholder:text-cinzaEscuro"/>
              <Hint direction={"end"} className="max-w-fit ml-auto text-cinzaEscuro">{descricao.length} / {max}</Hint>
            </div>
          </div>
          
          <div className="flex-grow md:flex-2/3 flex flex-col mb-10">
            <label className="text-2xl md:text-4xl font-semibold pb-2">Imagem do Projeto</label>
            <label htmlFor="input-imagem-projeto" className="w-full md:w-fit transform duration-300 text-sm md:text-lg lg:text-2xl xl:text-2xl bg-roxoClaro py-4 md:py-5 px-3 md:px-8 rounded-2xl md:rounded-3xl flex items-center justify-center gap-0 md:gap-5 font-semibold cursor-pointer hover:bg-roxoEscuro">
              Selecionar Imagem
            </label>
            <input onChange={(e) => { if (e.target.files) setImagem(e.target.files[0]); }} required id="input-imagem-projeto" type="file" accept="image/*" title="Imagem do projeto" className="hidden"/>
            {imagem && (<span className="text-white mt-2">Arquivo: {imagem.name}</span>)}
            <p className="text-xs md:text-sm text-white mt-2">Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-10 lg:gap-15 mb-10 md:items-end">
            <div className="flex-grow md:flex-2/3 flex flex-col">
              <label htmlFor="input-email-projeto" className="text-2xl md:text-4xl font-semibold pb-2">E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required id="input-email-projeto" type="email" title="E-mail do responsável" placeholder="Ex: aluno@alu.ufc.br" className="text-md md:text-xl px-5 py-2 md:px-8 md:py-5 bg-white text-preto rounded-xl md:rounded-3xl focus:outline-none placeholder:text-cinzaEscuro"/>
            </div>
            <div id="enviar-formulario-projeto" className="flex-1/3 flex-grow md:flex-2/3 flex-col transform duration-300 text-sm md:text-lg lg:text-2xl xl:text-2xl bg-roxoClaro py-4 md:py-5 px-3 md:px-8 rounded-2xl md:rounded-3xl flex items-center justify-center gap-0 md:gap-5 font-semibold max-w-fit max-h-fit cursor-pointer hover:bg-roxoEscuro has-[button:disabled]:bg-gray-500 has-[button:disabled]:cursor-not-allowed">
              <button type="submit" className="w-full h-full" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Submeter Projeto'}
              </button>
            </div>
          </div>
          
          <div id="fechar-formulario-projeto" className="w-fit absolute -top-3 md:-top-10 -right-3 md:-right-10">
            <button type="button" onClick={onClose} className=""><img src={closeIcon} alt="Fechar" className="w-8 md:w-15" /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioProjeto;