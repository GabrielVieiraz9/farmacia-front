import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { buscar, deletar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";
import { Link } from "react-router-dom";

function DeletarCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/categorias");
  }

  async function deletarCategoria() {
    try {
      await deletar(`/categorias/${id}`);

      alert("categoria apagada com sucesso");
    } catch (error) {
      alert("Erro ao apagar a categoria");
    }

    retornar();
  }
  return (
    <div className="min-h-[80vh]">
      <div className="container w-1/3 mx-auto">
        <h1 className="text-4xl text-center my-4">Deletar categoria</h1>

        <p className="text-center font-semibold mb-4">
          Você tem certeza de que deseja apagar o categoria a seguir?
        </p>

        <div className=" flex flex-col rounded-2xl overflow-hidden justify-between pb-5">
          <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
            categoria
          </header>
          <p className=" p-8 text-3xl bg-slate-200 h-full">{categoria.nome}</p>
          <div className="flex">
            <button
              className="rounded-bl-2xl text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="rounded-br-2xl w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
              onClick={deletarCategoria}
            >
              Sim
            </button>
          </div>
        </div>
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

export default DeletarCategoria;
