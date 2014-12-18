package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-05.
 */
public class TreeNodeCheck {

    private TreeNodeCheck parent;

    private List<TreeNodeCheck> children=new ArrayList<TreeNodeCheck>();


    private TAuMenuInfo menu;

    private boolean checked;

    public void addChild(TreeNodeCheck childNode){

        childNode.parent=this;

        children.add(childNode);
}

    public List<TreeNodeCheck> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNodeCheck> children) {
        this.children = children;
    }

    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }


}