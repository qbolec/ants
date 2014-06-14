JST = $(wildcard *.jst)
TS = $(JST:jst=ts)

all : $(TS)

%.ts : %.jst ../compile_template.js
	node ../compile_template.js $* < $< > $@

clean:
	rm $(TS)
