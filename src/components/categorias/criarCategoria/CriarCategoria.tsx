import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";

function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria);
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(categoria));
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria);

        alert("Categoria atualizada com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
        } else {
          alert("Erro ao atualizar o Categoria");
        }
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria);

        alert("Categoria cadastrado com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
        } else {
          alert("Erro ao cadastrado o Categoria");
        }
      }
    }

    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="min-h-[80vh]">
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl text-center my-8">
          {id === undefined ? "Cadastre um novo categoria" : "Editar categoria"}
        </h1>

        <form
          className="w-1/2 flex flex-col gap-4 pb-10"
          onSubmit={gerarNovaCategoria}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao">Descrição do categoria</label>
            <input
              type="text"
              placeholder="Descrição"
              name="descricao"
              style={{ borderWidth: "3px" }} // Definindo a largura da borda manualmente
              className="border-gray-300 rounded-lg p-2 focus:outline-none focus:border-indigo-500 transition duration-300 hover:border-blue-300 hover:shadow-md w-full"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="mt-5">
            <button
              className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
              type="submit"
            >
              {id === undefined ? "Cadastrar" : "Editar"}
            </button>
          </div>
        </form>
        <div className="flex justify-center w-full my-4 gap-4">
          <Link
            to="/categorias"
            className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar para Categorias
          </Link>
          <Link
            to="/home"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Voltar para a home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FormularioCategoria;
