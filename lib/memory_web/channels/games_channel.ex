defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.BackupAgent.get(name) || Memory.Game.new_game()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      Memory.BackupAgent.put(name, game)
      {:ok, %{"join" => name, "game" => Memory.Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("reset", payload, socket) do
    game = Memory.Game.reset(socket.assigns[:game])
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Memory.Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
