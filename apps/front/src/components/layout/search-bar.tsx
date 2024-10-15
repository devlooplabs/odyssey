import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState } from "react";
import { Button } from "../ui/button";

export function SearchBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <Button
        className="border rounded-xl h-8 justify-start bg-muted/50 text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <span>Pesquisar...</span>
      </Button>
      <Command>
        <CommandDialog open={open} onOpenChange={(open) => setOpen(open)}>
          <CommandInput placeholder="Pesquisar" />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Avançado">
              <CommandItem>
                <Search className="mr-2 h-4 w-4" />
                <span>Pesquisa avançada</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </div>
  );
}
