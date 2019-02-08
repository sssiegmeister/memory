defmodule Memory.Game do
	def new_game do
    valuesList = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]

    %{
      tiles: valuesList |> Enum.shuffle() |> Enum.chunk_every(4),
      clicks: 0,
      guesses: [],
      pair: false
    }
  end

  def client_view(game) do
    %{
      clicks: game.clicks,
      guesses: game.guesses,
      pair: game.pair
    }
  end

  def reset(game) do
    new_game()
  end
end