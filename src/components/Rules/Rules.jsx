import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import rules from "./rules.gif";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Rules() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>
        <HelpOutlineIcon style={{ color: "white" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Rules</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <img src={rules} style={{ width: "80%" }} />
          </div>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h2>How to Play</h2>
            <h3>Setup</h3>
            <p>
              The game is for 2-6 players, ages 7 and up. Every player starts
              with seven cards dealt face down. The rest of the cards are placed
              in a Draw Pile face down. Next to the pile is a space designated
              for a Discard Pile. The top card should be placed in the Discard
              Pile, and the game begins.
            </p>
            <h3>Game Play</h3>
            <p>
              The first player is chosen randomly and gameplay follows the order
              in which each player joined the room. Each player views their
              cards cards and tries to match the active card shown on the
              screen. You have to match either by the number, color, or the
              symbol/Action. For instance, if the active card is a red 8, you
              have to place either a red card or a card with an 8 on it. You can
              also play a Wild card (which can alter current color in play). If
              the player has no matches or they choose not to play any of their
              cards, they must draw a card from the Draw pile until a card is
              playable. The game then moves on to the next player's turn. You
              can also play a Wild card or a Wild Draw Four card on your turn.
              <br />
              <br />
              At any time, if the Draw Pile becomes depleted and no one has yet
              won the round, the discard deck is reshuffled and becomes the new
              Draw Pile. The game continues until a player has one card left, at
              which point that player must yell “UNO!” as loud as they possibly
              can. Once a player has no cards remaining, that player is the
              winner and the game ends. If at any point there are no cards
              remaining to draw and no cards to reshuffle in the discard pile,
              the game ends in a stalemate. Upon game completion, game results
              are logged to each user's profile and updated on our Leaderboard
              page.
              <h3>Action Cards</h3>
              <p>
                Aside from the number cards, there are several other cards that
                help alter game play. These are called Action Cards.
              </p>
              <ul>
                <li>
                  Reverse – If the turn direction is moving forward, the
                  direction switches to backward, and vice versa. In a
                  two-player game, this card has no effect on the turn direction
                  and the game proceeds to the next player's turn.
                </li>
                <li>
                  Skip – When a player places this carsd, the next player has to
                  skip their turn.
                </li>
                <li>
                  Draw Two – When a person places this card, the next player
                  will have to draw two cards from the play deck, and their turn
                  is skipped.
                </li>
                <li>
                  Wild – This card represents all four colors, and can be placed
                  on any card. The player gets to choose which color it will
                  represent for the next player. It can be played on top of any
                  active card.
                </li>
                <li>
                  Wild Draw Four – This acts just like the wild card except that
                  the next player also has to draw four cards and forfeits their
                  turn.
                </li>
              </ul>
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
