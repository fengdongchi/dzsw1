package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class ProStatusInfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeProStatusInfo> tmpsdao;

    private List<TMeProStatusInfo> tmpslist;

    private TMeProStatusInfo pros;

    private boolean success;

    private String message;

    public String tmpsupdate(){
        tmpslist=tmpsdao.myfindByHql("from TMeProStatusInfo where proStatusName=?",pros.getProStatusName());
        for(TMeProStatusInfo t:tmpslist){
            if(t.getProStatusName().equals(pros.getProStatusName())){
                success=false;
                message="更新失败";
                return SUCCESS;
            }
        }
        boolean result=tmpsdao.update(pros);
        if(result==false){
            success=false;
            message="更新失败";
            return SUCCESS;
        }else{
            success=true;
            message="更新成功";
            return SUCCESS;
        }
    }


    public List<TMeProStatusInfo> getTmpslist() {
        return tmpslist;
    }

    public void setTmpslist(List<TMeProStatusInfo> tmpslist) {
        this.tmpslist = tmpslist;
    }

    public TMeProStatusInfo getPros() {
        return pros;
    }

    public void setPros(TMeProStatusInfo pros) {
        this.pros = pros;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
