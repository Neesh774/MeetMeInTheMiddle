import { TbMoon, TbPlaylistAdd } from "react-icons/tb";
import Button from "./Button";
import Icon from "./Icon";
import IconButton from "./IconButton";

export default function Buttons() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Button size="sm" style="primary">
          Primary
        </Button>
        <Button size="sm" style="secondary">
          Secondary
        </Button>
        <Button size="sm" style="white">
          White
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Button size="md" style="primary">
          Primary
        </Button>
        <Button size="md" style="secondary">
          Secondary
        </Button>
        <Button size="md" style="white">
          White
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Button size="lg" style="primary">
          Primary
        </Button>
        <Button size="lg" style="secondary">
          Secondary
        </Button>
        <Button size="lg" style="white">
          White
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Icon>
          <TbMoon />
        </Icon>
        <IconButton>
          <TbPlaylistAdd />
        </IconButton>
      </div>
    </div>
  );
}
