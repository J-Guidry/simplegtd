class ItemModel{
    constructor(id,value, dateCreated, timeCreated, appointment){
        this.id = id;
        this.value = value;
        this.dateCreated = dateCreated;
        this.timeCreated = timeCreated;
        this.inbox = true;
        this.actionable = false;
        this.completed = false;
        this.nextAction = false;
        this.projects = false;
        this.someday = false;
        this.completed = false;
        this.appointments = false;
        this.appointment = appointment;
    }

    setItem(listArr){
        localStorage.setItem("list", JSON.stringify(listArr));
    }

    static createStorage(){
        localStorage.setItem("list", JSON.stringify([]));
    }

    static getArray(){
        let list = JSON.parse(localStorage.getItem("list"));

        let listArr;
        listArr = list;
        return listArr;
   }
   static guidGenerator() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4();
  }

   addItem(item){
        let listArr = ItemModel.getArray();
        if(item.value !== null || item.value !== ""){
            listArr.push(item);
            console.table(listArr);
            ItemModel.prototype.setItem(listArr);
        }


   }

   toggleCompleted(id){
    let listArr = ItemModel.getArray();
    for(var i = 0; i < listArr.length; i++){  
        if(listArr[i].id === id){
            listArr[i].completed = !listArr[i].completed;
            break;
        }
    }
    ItemModel.prototype.setItem(listArr);

   }

    deleteItem(id){
        let listArr = ItemModel.getArray();      
        //debugger;
        var ids, index;

        ids = listArr.map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if(index !== -1) {          
           listArr.splice(index, 1);
        } 
        this.setItem(listArr);
    }

    editItem(position, value){
        let listArr = ItemModel.getArray();
        //listArr[position].value = value;
        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === position){
                listArr[i].value = value;
                break;
            }
        }
        this.setItem(listArr);
    }
    
    toggleAction(id){
        if(id.value !== null || id.value !== ""){    
        let listArr = ItemModel.getArray();
           
        for(var i = 0; i < listArr.length; i++){  
            if(listArr[i].id === id){
                listArr[i].inbox = false;
                listArr[i].actionable = true;
                break;
            }
        }
        ItemModel.prototype.setItem(listArr);
     }
    }

    toggleNextAction(id){
        if(id.value !== null || id.value !== ""){  
        let listArr = ItemModel.getArray();
        
        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === id){
                listArr[i].nextAction = true;
                listArr[i].actionable = false;
                listArr[i].inbox = false;
                break;
            }
        }
        ItemModel.prototype.setItem(listArr);
     }
    }

    toggleProjects(id){
        if(id.value !== null || id.value !== ""){  
        let listArr = ItemModel.getArray();

        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === id){
                listArr[i].projects = true;
                listArr[i].actionable = false;
                listArr[i].inbox = false;
                break;
            }
        }
        ItemModel.prototype.setItem(listArr);
     }
    }

    toggleSomeday(id){
        if(id.value !== null || id.value !== ""){  
        let listArr = ItemModel.getArray();
        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === id){
                listArr[i].someday = true;
                listArr[i].actionable = false;
                listArr[i].inbox = false;
                break;
            }
        }
        ItemModel.prototype.setItem(listArr);
     }
    }

    toggleAppointments(id){
        if(id.value !== null || id.value !== ""){  
        let listArr = ItemModel.getArray();
        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === id){
                listArr[i].appointments = true;   
                listArr[i].actionable = false;
                listArr[i].inbox = false;   
                break;
            }
        }
        ItemModel.prototype.setItem(listArr);  
     }      
    }

    storeAppointment(time, id){
        let listArr = ItemModel.getArray();
        for(var i = 0; i < listArr.length; i++){
            if(listArr[i].id === id){
                listArr[i].appointment = time;
                break;
            }
        }

        this.setItem(listArr);
    }

    static dateCreated(){
        let today = moment().format('MM/DD/YYYY');
        return today;
    }

    static timeCreated(){
        let timeCreated = moment().format('h:mm a');
        return timeCreated;
    }
}


const UI = {
    DOMstrings: {
        inputValue: "#addToInbox",
        inputBtn: "#addBtn",
        inboxList: "#inbox",
        capturableList: "#capture",
        projectsList: "#projects",
        somedayList:"#someday",
        nextActionsList: "#nextActions",
        appointmentsList:"#appointments",
        deleteIcon: ".deleteButton",
        listItemInput: ".itemText",
        nextActionsLink:".nextAction",
        projectsLink: ".projects",
        somedayLink: ".someday",
        appointmentsLink: ".appointments",
        dateTimePickers: ".datetime",
        toggleIcon: ".toggle"
    },

    getInput: function(){
        return {
            value: document.querySelector(this.DOMstrings.inputValue).value            
        }
    },
    addListItem: function(value,id){
        if(value !== "" || value !== null){
            let inbox = document.querySelector(this.DOMstrings.inboxList);//a ul
            let li = document.createElement("li");
            li.id = id;
            li.className = "list-group-item";
            
            let listItemInput = document.createElement("input");
            listItemInput.className = "itemText";
            listItemInput.readOnly = true;
            listItemInput.value = value;
            li.appendChild(this.createToggleIcon(false));
            li.appendChild(listItemInput);
            li.appendChild(this.createCheckbox());
            li.appendChild(this.createDeleteIcon(id));
            inbox.appendChild(li);
        }

    },

    displayAtStart: function(storage){
        let inbox = document.querySelector(this.DOMstrings.inboxList);
        let capture = document.querySelector(this.DOMstrings.capturableList);
        let nextActions = document.querySelector(this.DOMstrings.nextActionsList);
        let projects = document.querySelector(this.DOMstrings.projectsList);
        let someday = document.querySelector(this.DOMstrings.somedayList);
        let appointments = document.querySelector(this.DOMstrings.appointmentsList);

        storage.forEach(function(item){
            if(item.value !== null || item.value !== ""){
                let itemLi = document.createElement("li");
                itemLi.className = "list-group-item";
                itemLi.id = item.id;   
                let date = document.createElement("span");
                date.className = "time";
                let textnode = document.createTextNode(item.dateCreated + " " + item.timeCreated); 
                date.appendChild(textnode);
    
                let listItemInput = document.createElement("input");
                listItemInput.className = "itemText";
                listItemInput.readOnly = true;
                listItemInput.value = item.value;
                
                itemLi.appendChild(this.createToggleIcon(item.completed));
                if(item.completed === true){
                    itemLi.classList.toggle("completed");
                }
                itemLi.appendChild(listItemInput);
      
                if(item.inbox === true){
                    itemLi.appendChild(this.createCheckbox());
                }
    
                itemLi.appendChild(this.createDeleteIcon(item.id));
                itemLi.appendChild(date);
                if(item.inbox === true){
                    inbox.appendChild(itemLi);
                } else if(item.actionable === true){
                    capture.appendChild(itemLi);
                    itemLi.appendChild(this.createDropDownsForProcessing(item.id));
                } else if(item.nextAction === true){
                    nextActions.appendChild(itemLi);
                } else if(item.projects === true){
                    projects.appendChild(itemLi);
                } else if(item.someday === true){
                    someday.appendChild(itemLi);
                } else if(item.appointments === true){
                    appointments.appendChild(itemLi);  
                    const dateTimePicker = UI.createDateTimePicker(`${item.id}`);
                    dateTimePicker.childNodes[0].value = item.appointment;
                    itemLi.appendChild(dateTimePicker);
                    $(`#${dateTimePicker.id}`).datetimepicker();
                }    
            }    
        }, this)
    },
    createToggleIcon: function(completed){
        let toggle = document.createElement("i");
        let icon = document.createElement("button");
        
        toggle.onclick = ItemController.prototype.ToggleCompleted;
        icon.className = "toggle";
        toggle.setAttribute("aria-hidden", true);
        if(completed === true){
            toggle.className = "fa fa-check-circle-o fa-lg";
        } else if(completed === false){
            toggle.className = "fa fa-circle-o fa-lg";
        }

        icon.appendChild(toggle);
        return icon;
    },

    createDeleteIcon: function(id){
        let deleteIcon = document.createElement("i");
        let deleteButton = document.createElement("button");

        deleteIcon.id = "delete-" + id;
        deleteIcon.className = "fa fa-times fa-lg";
        deleteIcon.setAttribute("aria-hidden", true);
        deleteButton.className = "deleteButton";
        deleteIcon.onclick = ItemController.prototype.CtrlDeleteItem;
        deleteButton.appendChild(deleteIcon);
        return deleteButton;
      },
    createCheckbox: function(){
        let actionableSpan = document.createElement("span");
        let label = document.createElement("label");
        //let labelText = document.createTextNode("Is it Actionable?");
        label.textContent = "Is it Actionable?";
        actionableSpan.appendChild(label);
        let checkActionable = document.createElement("input");
        checkActionable.type = "checkbox";
        checkActionable.className = "actionable";
        checkActionable.onclick = ItemController.prototype.MakeActionable;
        actionableSpan.appendChild(checkActionable);
        return actionableSpan;
     },
    createDropDownsForProcessing: function(itemId){
        let dropDown = document.createElement("div");
        dropDown.className = "dropdown";
        dropDown.id = itemId;
        
        let dropBtn = document.createElement("button");
        dropBtn.className = 'btn btn-primary dropdown-toggle';
        dropBtn.textContent = "Process";
        dropBtn.id = "dropdownMenuButton";
        dropBtn.setAttribute("aria-haspopup", "true");
        dropBtn.setAttribute("aria-expanded", "false");
        dropBtn.dataset.toggle = "dropdown";
        dropDown.appendChild(dropBtn);
       
        let dropDownContent = document.createElement("div");
        dropDownContent.className = "dropdown-menu";
        dropDownContent.setAttribute("aria-labelledby", "dropdownMenuButton");

        let nextAction = document.createElement("a");
        nextAction.href = "#";
        nextAction.textContent = "Next Actions";
        nextAction.className = "nextAction dropdown-item";
        nextAction.onclick = ItemController.prototype.SendToWrapper;

        let projects = document.createElement("a");
        projects.href = "#";
        projects.textContent = "Projects";
        projects.className = "projects dropdown-item";
        projects.onclick = ItemController.prototype.SendToWrapper;

        let someday = document.createElement("a");
        someday.href = "#";
        someday.textContent = "Someday/Maybe";
        someday.className = "someday dropdown-item";
        someday.onclick = ItemController.prototype.SendToWrapper;

        let appointment = document.createElement("a");
        appointment.href = "#";
        appointment.textContent = "Appointment";
        appointment.className = "appointments dropdown-item";
        appointment.onclick = ItemController.prototype.SendToAppointments;

        dropDownContent.appendChild(nextAction);
        dropDownContent.appendChild(projects);
        dropDownContent.appendChild(someday);
        dropDownContent.appendChild(appointment);
        dropDown.appendChild(dropDownContent);
        return dropDown;
     },
    deleteItem: function(id){
        const item = document.getElementById(id);
        if(item){
            item.parentNode.removeChild(item);
        }       
     },
    editItem(id){
        let input = id.children[0];
        input.readOnly = false;
        //input.focus();
        },
    
    toggleCompleted(id, completed, uncompleted){
        let item = document.getElementById(id);

        if(item.childNodes[0].childNodes[0].className === completed){
            item.replaceChild(this.createToggleIcon(false), item.childNodes[0]);
            item.classList.toggle("completed");
        } else if(item.childNodes[0].childNodes[0].className === uncompleted){
            item.replaceChild(this.createToggleIcon(true), item.childNodes[0]);
            item.classList.toggle("completed");
        }
    },
    shiftToActionable: function(item, captureTab){
        captureTab.appendChild(item);
        item.removeChild(item.childNodes[2]);
        item.appendChild(this.createDropDownsForProcessing(item.id));
        },
    sendToTab: function(item, Tab){
        Tab.appendChild(item);
        item.removeChild(item.childNodes[4]);
        },
    sendToAppointments: function(item, appointmentsTab, dateTimePicker){
        appointmentsTab.appendChild(item);
        item.removeChild(item.childNodes[4]);    
        item.appendChild(dateTimePicker);
        $(`#${dateTimePicker.id}`).datetimepicker();
     },
    clearInputField: function() {
        document.querySelector("#addToInbox").value = ""; 
     },
    displayDateAndTime: function(today, timeCreated,id){
        let listItem = document.getElementById(id);
        let date = document.createElement("span");
        date.className = "time";
        let textnode = document.createTextNode(today + " " + timeCreated);  
        date.appendChild(textnode);
        listItem.appendChild(date);
     },
    createDateTimePicker: function(id){
        const dateTimePicker = document.createElement("span");
        const input = document.createElement("input");
        const iconCover = document.createElement("span");
        const icon = document.createElement("span");
        dateTimePicker.id = `${id}DT`;
        dateTimePicker.className = "input-group date";
        input.id = `${id}DTInput`;
        input.className = "datetime";
        iconCover.className = "input-group-addon";
        icon.className = "glyphicon glyphicon-calendar";
        iconCover.appendChild(icon);
        dateTimePicker.appendChild(input);
        dateTimePicker.appendChild(iconCover);
        dateTimePicker.style.display = "inline";
        return dateTimePicker;
    }
}

class ItemController{
    constructor(){
        this.UI = UI;
    }

    setUpListeners(){
        const DOM = UI.DOMstrings;
        
        //click
        this.wrapperforEventListeners(DOM.inputValue,"click");
        this.wrapperforEventListeners(DOM.inputBtn, "click");
        this.wrapperforEventListeners(DOM.capturableList, "click");
        this.wrapperforEventListeners(DOM.nextActionsList, "click");
        this.wrapperforEventListeners(DOM.nextActionsLink, "click");
        this.wrapperforEventListeners(DOM.projectsList, "click");
        this.wrapperforEventListeners(DOM.projectsLink, "click");
        this.wrapperforEventListeners(DOM.somedayList, "click");
        this.wrapperforEventListeners(DOM.somedayLink, "click");
        this.wrapperforEventListeners(DOM.appointmentsList, "click");
        this.wrapperforEventListeners(DOM.appointmentsLink, "click");
        //debugger;
        if(document.querySelector('body').empty === false){
            this.wrapperforEventListeners(DOM.toggleIcon, "click");
            this.wrapperforEventListeners(DOM.deleteIcon, "click");
        }

        //keydown for input
        this.wrapperforEventListeners(DOM.inputValue, "keydown");
        this.wrapperforEventListeners(DOM.inboxList, "keydown");
        this.wrapperforEventListeners(DOM.capturableList, "keydown");
        this.wrapperforEventListeners(DOM.nextActionsList, "keydown");
        this.wrapperforEventListeners(DOM.projectsList, "keydown");
        this.wrapperforEventListeners(DOM.somedayList, "keydown");
        this.wrapperforEventListeners(DOM.appointmentsList, "keydown");

        //Doubleclick for editing
        this.wrapperforEventListeners(DOM.inboxList, "dblclick");
        this.wrapperforEventListeners(DOM.capturableList, "dblclick");
        this.wrapperforEventListeners(DOM.nextActionsList, "dblclick");
        this.wrapperforEventListeners(DOM.projectsList, "dblclick");
        this.wrapperforEventListeners(DOM.somedayList, "dblclick");
        this.wrapperforEventListeners(DOM.appointmentsList, "dblclick");

        //Blur for exiting edits
        this.wrapperforEventListeners(DOM.inboxList, "blur");
        this.wrapperforEventListeners(DOM.capturableList, "blur");
        this.wrapperforEventListeners(DOM.nextActionsList, "blur");
        this.wrapperforEventListeners(DOM.projectsList, "blur");
        this.wrapperforEventListeners(DOM.somedayList, "blur");
        this.wrapperforEventListeners(DOM.appointmentsList, "blur");

        //for sending to captuable list
        document.querySelector(DOM.inboxList).addEventListener("change", function(event){
            if(event.target.value === "on"){
                ItemController.prototype.MakeActionable(event);
            }
         });
        
       //for storing appointment date and time
        Array.from(document.querySelectorAll(DOM.dateTimePickers)).forEach(function(picker){
            picker.addEventListener("blur", ItemController.prototype.StoreAppointments);     
         });
    }
    wrapperforEventListeners(DOMstring, DOMevent){
        const DOM = UI.DOMstrings;
        switch(DOMevent){

            case "click":
                if(DOMstring === DOM.inputBtn || DOMstring === DOM.toggleIcon || DOMstring === DOM.deleteIcon){
                    document.querySelector(DOMstring).addEventListener(DOMevent, function(event){
                        if(event.target.id ==="addBtn"){

                            ItemController.prototype.CtrlAddItem();
                        } else if(event.target.className === "toggle"){
                            ItemController.prototype.ToggleCompleted(event);
                        } else if(event.target.className === "deleteButton"){

                            ItemController.prototype.CtrlDeleteItem(event);
                         }  
                    });
                } 
                
                if(DOMstring ===  DOM.nextActionsLink ||
                   DOMstring === DOM.projectsLink ||
                   DOMstring === DOM.somedayLink ||
                   DOMstring === DOM.appointmentsLink){
                    Array.from(document.querySelectorAll(DOMstring)).forEach(function(link){
                        link.addEventListener(DOMevent, function(event){
                            ItemController.prototype.SendToWrapper(event);            
                        });
                    });
                }
                break;
            case "keydown":
             if(DOMstring !== DOM.inputValue){
                document.querySelector(DOMstring).addEventListener(DOMevent, function(event){
                    if(event.keyCode === 13 || event.which === 13){

                        let itemId = event.target.parentNode.id;
                        event.preventDefault();
                        ItemModel.prototype.editItem(itemId,event.target.value);
                        event.target.readOnly = true;
                        event.target.blur();
                    } else if(event.keyCode === 27 || event.which === 27){
                        event.preventDefault();
                        event.target.blur();
                        event.target.readOnly = true;
                    }
                });
             } else {
                document.querySelector(DOMstring).addEventListener("keydown", function(event){
                    if (event.target.value !== "" && (event.keyCode === 13 || event.which === 13)) {
                        event.preventDefault();
                        ItemController.prototype.CtrlAddItem();
                    }
                });
             }

                break;
            case "dblclick":
                document.querySelector(DOMstring).addEventListener(DOMevent, ItemController.prototype.CtrlEditItem);
                break;
            case "blur":
                document.querySelector(DOMstring).addEventListener(DOMevent, function(event){
                    let name = event.target.className;
                    if(name === "itemText"){
                       event.target.readOnly = false;
                    }         
               }, true);
             break;
        default: 
               //do nothing
               break;
        }
    }

    CheckForListItems(){
        const DOM = UI.DOMstrings;
        const inbox = document.querySelector(DOM.inboxList).children.length;
        const nextActions = document.querySelector(DOM.nextActionsList).children.length;
        const projects = document.querySelector(DOM.projectsList).children.length;
        const someday = document.querySelector(DOM.somedayList).children.length;
        const capturable = document.querySelector(DOM.capturableList).children.length;
        const appointments = document.querySelector(DOM.appointmentsList).children.length;

        if(!inbox && !nextActions && !projects && !someday && !capturable && !appointments){
            document.querySelector("body").empty = true;
        } else{
            document.querySelector('body').empty = false;
        }
    }

    Display(){
        const stor = ItemModel.getArray();
        UI.displayAtStart(stor);
        ItemModel.prototype.setItem(stor);
     }

    CtrlAddItem(){
        //1. Get the field input data
        const input = UI.getInput();
        if(input.value !== "" && input.value !== null){
            // Date and Time Item was created in
            const dateMade = ItemModel.dateCreated();
            const timeCreated = ItemModel.timeCreated();

            //. create id of item
            //let id = new Date().toString();
            let id = ItemModel.guidGenerator();
            
            //. instantiate item
            const item = new ItemModel(id, input.value, dateMade, timeCreated, null);
            
            //. add to storage
            item.addItem(item);

            // add to UI
            UI.addListItem(input.value, item.id);

            // clear field
            UI.clearInputField();       

            UI.displayDateAndTime(dateMade, timeCreated, item.id);
        }
 
    }

    ToggleCompleted(event){
        let idFromBtn = event.target.parentNode.parentNode.id;

        const completed = "fa fa-check-circle-o fa-lg";
        const uncompleted = "fa fa-circle-o fa-lg";

        ItemModel.prototype.toggleCompleted(idFromBtn);

        UI.toggleCompleted(idFromBtn, completed, uncompleted);
    }

    CtrlDeleteItem(event){
        let idFromBtn = event.target.parentNode.parentNode.id;

        //delete from data
        ItemModel.prototype.deleteItem(idFromBtn); 
        
        //delete from UI            
        UI.deleteItem(idFromBtn);
    }

    CtrlEditItem(event){
        let id = event.target.parentNode;
        let name = event.target.parentNode.nodeName;

        if(id && name === "LI"){
            let value = UI.editItem(id);
        }
    }

    MakeActionable(event){
        event.stopPropagation();
        let item = event.target.parentNode.parentNode;
        let itemId = event.target.parentNode.parentNode.id;
        let value = event.target.parentNode.previousSibling.value;
        let node =  document.querySelector(UI.DOMstrings.capturableList);
        ItemModel.prototype.toggleAction(itemId);
        UI.shiftToActionable(item, node);
    }


    SendToWrapper(event){
        //event.stopPropagation();
        let itemId = event.target.parentNode.parentNode.id;
        let item = event.target.parentNode.parentNode.parentNode;

        if(event.target.className === "nextAction dropdown-item"){
            ItemModel.prototype.toggleNextAction(itemId);
            let node = document.querySelector(UI.DOMstrings.nextActionsList);
            UI.sendToTab(item, node);
        } else if(event.target.className === "projects dropdown-item"){
            ItemModel.prototype.toggleProjects(itemId);
            let node = document.querySelector(UI.DOMstrings.projectsList);
            UI.sendToTab(item, node);
        } else if(event.target.className === "someday dropdown-item"){
            ItemModel.prototype.toggleSomeday(itemId);
            let node = document.querySelector(UI.DOMstrings.somedayList);
            UI.sendToTab(item, node);
        }
    }

    SendToAppointments(event){
        event.stopPropagation();
        let itemId = event.target.parentNode.parentNode.id;
        let item = event.target.parentNode.parentNode.parentNode;
        ItemModel.prototype.toggleAppointments(itemId);
        UI.sendToAppointments(item, document.querySelector(UI.DOMstrings.appointmentsList), UI.createDateTimePicker(itemId));
    }

    StoreAppointments(event){
        event.stopPropagation();
        let appointment = event.target.value;
        let id = event.target.parentNode.parentNode.id;
        ItemModel.prototype.storeAppointment(appointment, id);
    }

    static init(){
        if(localStorage.list == undefined){
            ItemModel.createStorage();
        }
        const ctrl = new ItemController();
        ctrl.CheckForListItems();
        ctrl.Display();
        ctrl.setUpListeners();
    }
}

ItemController.init();